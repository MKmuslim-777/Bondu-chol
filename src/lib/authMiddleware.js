import admin from "./firebase-admin";
import { getDB } from "./mongodb";

export async function verifyFBToken(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    return { email: decoded.email, uid: decoded.uid };
  } catch {
    return { error: "Unauthorized", status: 401 };
  }
}

export async function verifyAdmin(email) {
  const db = await getDB();
  const user = await db.collection("users").findOne({ email });
  if (!user || user.role !== "admin") {
    return { error: "Forbidden", status: 403 };
  }
  return { ok: true };
}
