import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken } from "@/lib/authMiddleware";

export async function GET(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });

  const db = await getDB();
  const user = await db.collection("users").findOne({ email: decoded.email });
  return NextResponse.json(user || {});
}

export async function PATCH(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });

  try {
    const body = await request.json();
    // strip protected fields
    const { role, email, createdAt, _id, ...safe } = body;
    safe.updatedAt = new Date();

    const db = await getDB();
    await db.collection("users").updateOne(
      { email: decoded.email },
      { $set: safe },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
