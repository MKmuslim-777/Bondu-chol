// Load .env.local before anything else
require("fs").existsSync(".env.local") &&
  require("fs")
    .readFileSync(".env.local", "utf-8")
    .split("\n")
    .forEach((line) => {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    });

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require("mongodb");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// MongoDB setup
const uri = process.env.MONGODB_URI;
let db = null;

async function connectDB() {
  if (db) return db;
  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });
  await client.connect();
  db = client.db("bonduCholDB");
  console.log("> MongoDB connected for chat");
  return db;
}

// In-memory cache (last 50 messages)
const messages = [];
const MAX_MESSAGES = 50;

// Chat room settings cache
let chatSettings = { name: "Bara Chat Room", bgImage: "", bgColor: "" };

async function loadChatSettings() {
  try {
    const doc = await db.collection("chatSettings").findOne({ _id: "main" });
    if (doc) chatSettings = { name: doc.name || "Bara Chat Room", bgImage: doc.bgImage || "", bgColor: doc.bgColor || "" };
  } catch (e) {
    console.error("Failed to load chat settings:", e.message);
  }
}

app.prepare().then(async () => {
  // Connect DB before starting server
  await connectDB();

  // Load last 50 messages from DB into memory cache
  try {
    const saved = await db
      .collection("chats")
      .find({})
      .sort({ timestamp: -1 })
      .limit(MAX_MESSAGES)
      .toArray();
    saved.reverse().forEach((m) => messages.push(m));
    console.log(`> Loaded ${messages.length} chat messages from DB`);
  } catch (e) {
    console.error("Failed to load chat history:", e.message);
  }

  // Load chat settings
  await loadChatSettings();

  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === "production"
        ? [process.env.NEXT_PUBLIC_APP_URL || "*"]
        : "*",
      methods: ["GET", "POST"],
    },
    path: "/api/socket",
  });

  // Online users map: socketId -> { name, photoURL, email, role }
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    // User joins chat room
    socket.on("join", ({ name, photoURL, email, role }) => {
      if (role !== "bara" && role !== "admin") {
        socket.emit("error", "Access denied. Bara members only.");
        socket.disconnect();
        return;
      }

      onlineUsers.set(socket.id, { name, photoURL, email, role });
      socket.join("bara-chat");

      // Send message history from memory cache
      socket.emit("history", messages);

      // Send current chat settings
      socket.emit("chat_settings", chatSettings);

      // Broadcast updated online users
      io.to("bara-chat").emit("online_users", Array.from(onlineUsers.values()));

      // System message
      io.to("bara-chat").emit("system", `${name} joined the chat`);
    });

    // New message
    socket.on("message", ({ text }) => {
      if (!text?.trim()) return;
      const user = onlineUsers.get(socket.id);
      if (!user) return;

      const msg = {
        id: Date.now() + Math.random(),
        text: text.trim(),
        name: user.name,
        photoURL: user.photoURL,
        email: user.email,
        timestamp: new Date().toISOString(),
      };

      // Update memory cache
      messages.push(msg);
      if (messages.length > MAX_MESSAGES) messages.shift();

      // Save to MongoDB (async, non-blocking)
      db.collection("chats")
        .insertOne({ ...msg })
        .catch((e) => console.error("Chat save error:", e.message));

      io.to("bara-chat").emit("message", msg);
    });

    // Typing indicator
    socket.on("typing", (isTyping) => {
      const user = onlineUsers.get(socket.id);
      if (!user) return;
      socket.to("bara-chat").emit("typing", { name: user.name, isTyping });
    });

    // Admin updates chat settings — broadcast to all
    socket.on("update_chat_settings", async (settings) => {
      const user = onlineUsers.get(socket.id);
      if (!user || user.role !== "admin") return;
      chatSettings = {
        name: settings.name || chatSettings.name,
        bgImage: settings.bgImage ?? chatSettings.bgImage,
        bgColor: settings.bgColor ?? chatSettings.bgColor,
      };
      // Persist to DB
      db.collection("chatSettings")
        .updateOne({ _id: "main" }, { $set: chatSettings }, { upsert: true })
        .catch((e) => console.error("Settings save error:", e.message));
      // Broadcast to everyone in room
      io.to("bara-chat").emit("chat_settings", chatSettings);
    });

    socket.on("disconnect", () => {
      const user = onlineUsers.get(socket.id);
      if (user) {
        io.to("bara-chat").emit("system", `${user.name} left the chat`);
        onlineUsers.delete(socket.id);
        io.to("bara-chat").emit("online_users", Array.from(onlineUsers.values()));
      }
    });
  });

  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log("> Shutting down gracefully...");
    httpServer.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
});
