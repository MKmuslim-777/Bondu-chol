"use client";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 dark:border-gray-800" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-yellow-500 animate-spin" />
        <div className="absolute inset-[6px] rounded-full bg-yellow-500/10 animate-pulse" />
      </div>
      {text && <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">{text}</p>}
    </div>
  );
}
