import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken, verifyAdmin } from "@/lib/authMiddleware";

export async function GET() {
  try {
    const db = await getDB();
    const result = await db.collection("gallery").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const item = await request.json();
    item.createdAt = new Date();
    const db = await getDB();
    const result = await db.collection("gallery").insertOne(item);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}
