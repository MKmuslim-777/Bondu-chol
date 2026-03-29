"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/hooks/useRole";
import RoleGuard from "@/components/shared/RoleGuard";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUsers, FaCircle, FaSmile } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Picker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import("@emoji-mart/react").then((m) => m.default),
  { ssr: false }
);

let socket = null;

function Avatar({ src, name }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=random`}
      alt={name}
      className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-yellow-500/30"
    />
  );
}

function SystemMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center my-1"
    >
      <span className="text-[11px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/80 px-3 py-1 rounded-full">
        {text}
      </span>
    </motion.div>
  );
}

function ChatMessage({ msg, isOwn }) {
  const time = new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isOwn && <Avatar src={msg.photoURL} name={msg.name} />}
      <div className={`max-w-[70%] flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        {!isOwn && (
          <span className="text-[11px] font-bold text-yellow-600 dark:text-yellow-400 px-1">{msg.name}</span>
        )}
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
          isOwn
            ? "bg-yellow-500 text-gray-950 rounded-br-sm"
            : "bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-sm backdrop-blur-sm"
        }`}>
          {msg.text}
        </div>
        <span className="text-[10px] text-gray-400 px-1">{time}</span>
      </div>
    </motion.div>
  );
}

export default function BaraChatPage() {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  const [feed, setFeed] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [showOnline, setShowOnline] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [chatSettings, setChatSettings] = useState({ name: "Bara Chat Room", bgImage: "", bgColor: "" });
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);
  const emojiRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [feed, scrollToBottom]);

  // Close emoji picker on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (roleLoading || !user || (role !== "bara" && role !== "admin")) return;

    socket = io({ path: "/api/socket", transports: ["websocket", "polling"] });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join", { name: user.displayName, photoURL: user.photoURL, email: user.email, role });
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("history", (history) => {
      setFeed(history.map((m) => ({ ...m, _type: "msg", _ts: new Date(m.timestamp).getTime() })));
    });

    socket.on("message", (msg) => {
      setFeed((prev) => [...prev, { ...msg, _type: "msg", _ts: new Date(msg.timestamp).getTime() }]);
    });

    socket.on("system", (text) => {
      setFeed((prev) => [...prev, { _type: "sys", text, _ts: Date.now(), id: Date.now() + Math.random() }]);
    });

    socket.on("online_users", (users) => setOnlineUsers(users));

    socket.on("chat_settings", (settings) => setChatSettings(settings));

    socket.on("typing", ({ name, isTyping }) => {
      setTypingUsers((prev) =>
        isTyping ? [...new Set([...prev, name])] : prev.filter((n) => n !== name)
      );
    });

    return () => { socket?.disconnect(); socket = null; };
  }, [user, role, roleLoading]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit("message", { text: input.trim() });
    setInput("");
    socket.emit("typing", false);
    setShowEmoji(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleTyping = (val) => {
    setInput(val);
    if (!socket) return;
    socket.emit("typing", true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => socket.emit("typing", false), 1500);
  };

  const handleEmojiSelect = (emoji) => {
    const native = emoji.native;
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newVal = input.slice(0, start) + native + input.slice(end);
      setInput(newVal);
      // Restore cursor position after emoji insert
      setTimeout(() => {
        textarea.selectionStart = start + native.length;
        textarea.selectionEnd = start + native.length;
        textarea.focus();
      }, 0);
    } else {
      setInput((prev) => prev + native);
    }
  };

  return (
    <RoleGuard allowed={["bara", "admin"]}>
      <div className="h-[calc(100vh-8rem)] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
              <MdStar className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-800 dark:text-white">{chatSettings.name}</h1>
              <div className="flex items-center gap-1.5">
                <FaCircle className={`text-[8px] ${connected ? "text-green-500" : "text-gray-400"}`} />
                <span className="text-xs text-gray-400">{connected ? "Connected" : "Connecting..."}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowOnline((p) => !p)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:border-yellow-400 transition-all"
          >
            <FaUsers className="text-yellow-500" />
            <span>{onlineUsers.length} online</span>
          </button>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">
          {/* Chat area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-w-0">
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{
                backgroundImage: chatSettings.bgImage ? `url(${chatSettings.bgImage})` : undefined,
                backgroundColor: !chatSettings.bgImage && chatSettings.bgColor ? chatSettings.bgColor : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "local",
              }}
            >
              {feed.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center mb-4">
                    <MdStar className="text-yellow-500 text-3xl" />
                  </div>
                  <p className="font-black text-gray-700 dark:text-gray-300">Welcome to Bara Chat!</p>
                  <p className="text-sm text-gray-400 mt-1">Start the conversation with your Bara friends.</p>
                </div>
              )}

              {feed.map((item) =>
                item._type === "sys"
                  ? <SystemMessage key={item.id} text={item.text} />
                  : <ChatMessage key={item.id} msg={item} isOwn={item.email === user?.email} />
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {typingUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                    className="flex items-center gap-2 text-xs text-gray-400"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <span>{typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              {/* Emoji Picker */}
              <AnimatePresence>
                {showEmoji && (
                  <motion.div
                    ref={emojiRef}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="mb-2"
                  >
                    <EmojiPicker
                      onEmojiSelect={handleEmojiSelect}
                      theme="auto"
                      previewPosition="none"
                      skinTonePosition="none"
                      maxFrequentRows={2}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-end gap-2">
                {/* Emoji toggle button */}
                <button
                  type="button"
                  onClick={() => setShowEmoji((p) => !p)}
                  className={`p-2.5 rounded-xl border transition-all flex-shrink-0 ${
                    showEmoji
                      ? "bg-yellow-500 border-yellow-500 text-black"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-yellow-400 hover:text-yellow-500"
                  }`}
                  title="Emoji"
                >
                  <FaSmile className="text-sm" />
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message... (Enter to send)"
                  rows={1}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition-all placeholder:text-gray-400"
                  style={{ maxHeight: "120px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || !connected}
                  className="p-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 text-black rounded-xl transition-all shadow-md shadow-yellow-500/20 flex-shrink-0"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Online users panel — desktop: side panel, mobile: bottom drawer */}
          <AnimatePresence>
            {showOnline && (
              <>
                {/* Mobile: bottom drawer with backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowOnline(false)}
                  className="fixed inset-0 bg-black/50 z-[80] lg:hidden"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 z-[90] bg-white dark:bg-gray-900 rounded-t-3xl border-t border-gray-100 dark:border-gray-800 shadow-2xl lg:hidden"
                  style={{ maxHeight: "60vh" }}
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Online — {onlineUsers.length}</p>
                    {/* drag handle */}
                    <button
                      onClick={() => setShowOnline(false)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="p-3 space-y-2 overflow-y-auto" style={{ maxHeight: "calc(60vh - 56px)" }}>
                    {onlineUsers.map((u, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        <div className="relative flex-shrink-0">
                          <Avatar src={u.photoURL} name={u.name} />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{u.name}</p>
                          <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-bold capitalize">{u.role}</span>
                        </div>
                      </div>
                    ))}
                    {onlineUsers.length === 0 && <p className="text-xs text-gray-400 text-center py-6">No one online</p>}
                  </div>
                </motion.div>

                {/* Desktop: side panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 220 }}
                  exit={{ opacity: 0, x: 20, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden lg:flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex-shrink-0"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Online — {onlineUsers.length}</p>
                  </div>
                  <div className="p-3 space-y-2 overflow-y-auto flex-1">
                    {onlineUsers.map((u, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        <div className="relative flex-shrink-0">
                          <Avatar src={u.photoURL} name={u.name} />
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 dark:text-white truncate">{u.name}</p>
                          <span className="text-[10px] text-yellow-600 dark:text-yellow-400 font-bold capitalize">{u.role}</span>
                        </div>
                      </div>
                    ))}
                    {onlineUsers.length === 0 && <p className="text-xs text-gray-400 text-center py-4">No one online</p>}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </RoleGuard>
  );
}
