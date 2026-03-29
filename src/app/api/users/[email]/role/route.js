import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { verifyFBToken, verifyAdmin } from "@/lib/authMiddleware";

export async function GET(request, { params }) {
  const { email } = await params;
  const db = await getDB();
  const user = await db.collection("users").findOne({ email });
  const role = user?.role || "user";
  return NextResponse.json({ role });
}

export async function PATCH(request, { params }) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const VALID_ROLES = ["user", "bara", "moderator", "admin"];
    const { email } = await params;
    const { role } = await request.json();
    if (!role || !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    const db = await getDB();
    await db.collection("users").updateOne({ email }, { $set: { role } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const decoded = await verifyFBToken(request);
  if (decoded.error) return NextResponse.json({ message: decoded.error }, { status: decoded.status });
  const adminCheck = await verifyAdmin(decoded.email);
  if (adminCheck.error) return NextResponse.json({ message: adminCheck.error }, { status: adminCheck.status });

  try {
    const { email } = await params;
    const db = await getDB();
    await db.collection("users").deleteOne({ email });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
