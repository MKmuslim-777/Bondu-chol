import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken, verifyAdmin } from "@/lib/authMiddleware";

export async function GET() {
  try {
    const db = await getDB();
    const result = await db.collection("events").find({}).sort({ date: 1 }).toArray();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const body = await request.json();
    body.createdAt = new Date();
    const db = await getDB();
    const result = await db.collection("events").insertOne(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
