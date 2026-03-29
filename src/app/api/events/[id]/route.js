import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken, verifyAdmin } from "@/lib/authMiddleware";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const db = await getDB();
    const event = await db.collection("events").findOne({ _id: new ObjectId(id) });
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(event);
  } catch {
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const { id } = await params;
    const body = await request.json();
    body.updatedAt = new Date();
    const db = await getDB();
    const result = await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const { id } = await params;
    const db = await getDB();
    const result = await db.collection("events").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
