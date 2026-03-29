"use client";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="font-bold text-2xl">
      বন্ধু <span className="text-yellow-500">চল</span>
    </Link>
  );
}
