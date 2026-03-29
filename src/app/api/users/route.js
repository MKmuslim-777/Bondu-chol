import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken, verifyAdmin } from "@/lib/authMiddleware";

export async function GET(request) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) {
    return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  }
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) {
    return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });
  }

  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("filter");
  const query = {};
  if (searchText) {
    query.$or = [
      { displayName: { $regex: searchText, $options: "i" } },
      { email: { $regex: searchText, $options: "i" } },
    ];
  }
  const db = await getDB();
  const result = await db.collection("users").find(query).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(result);
}

export async function POST(request) {
  try {
    const user = await request.json();
    user.role = "user";
    user.createdAt = new Date();
    const db = await getDB();
    const exists = await db.collection("users").findOne({ email: user.email });
    if (exists) return NextResponse.json({ message: "User already exists" }, { status: 409 });
    const result = await db.collection("users").insertOne(user);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
