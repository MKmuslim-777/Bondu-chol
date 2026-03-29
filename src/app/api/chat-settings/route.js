import { getDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

const DEFAULTS = { name: "Bara Chat Room", bgImage: "", bgColor: "" };

export async function GET() {
  try {
    const db = await getDB();
    const doc = await db.collection("chatSettings").findOne({ _id: "main" });
    return NextResponse.json(doc ? { name: doc.name, bgImage: doc.bgImage, bgColor: doc.bgColor } : DEFAULTS);
  } catch {
    return NextResponse.json(DEFAULTS);
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const update = {};
    if (typeof body.name === "string")    update.name    = body.name.trim() || DEFAULTS.name;
    if (typeof body.bgImage === "string") update.bgImage = body.bgImage;
    if (typeof body.bgColor === "string") update.bgColor = body.bgColor;

    const db = await getDB();
    await db.collection("chatSettings").updateOne(
      { _id: "main" },
      { $set: update },
      { upsert: true }
    );
    const updated = await db.collection("chatSettings").findOne({ _id: "main" });
    return NextResponse.json({ name: updated.name, bgImage: updated.bgImage, bgColor: updated.bgColor });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
