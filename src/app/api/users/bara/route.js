import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("filter");
  const query = { role: "bara" };
  if (searchText) {
    query.$and = [
      { role: "bara" },
      {
        $or: [
          { displayName: { $regex: searchText, $options: "i" } },
          { email: { $regex: searchText, $options: "i" } },
        ],
      },
    ];
  }
  const db = await getDB();
  const result = await db.collection("users").find(query).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(result);
}
