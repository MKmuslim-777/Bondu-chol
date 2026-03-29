import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken } from "@/lib/authMiddleware";

export async function GET() {
  try {
    const db = await getDB();
    const result = await db.collection("memories").find({}).toArray();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch memories" }, { status: 500 });
  }
}

export async function POST(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) {
    return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  }
  try {
    const memory = await request.json();
    memory.createdAt = new Date();
    const db = await getDB();
    const result = await db.collection("memories").insertOne(memory);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to add memory" }, { status: 500 });
  }
}
