"use client";
import { useRef, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { FaTimes, FaCheck } from "react-icons/fa";
import { MdImage } from "react-icons/md";

export default function ImageUploader({ value, onChange, label = "ছবি আপলোড করুন", aspect = "cover" }) {
  const { upload, uploading } = useImageUpload();
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const aspectClass = {
    square: "aspect-square",
    video:  "aspect-video",
    cover:  "h-40",
  }[aspect] || "h-40";

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("শুধু ছবি ফাইল সাপোর্টেড"); return; }
    if (file.size > 10 * 1024 * 1024) { setError("ফাইল সাইজ ১০MB এর বেশি হবে না"); return; }
    setError("");
    const url = await upload(file);
    if (url) onChange(url);
    else setError("আপলোড ব্যর্থ হয়েছে");
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      {label && <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative ${aspectClass} w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
          ${dragOver ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10" : "border-gray-200 dark:border-gray-700 hover:border-yellow-400 bg-gray-50 dark:bg-gray-800/50"}
          ${uploading ? "pointer-events-none" : ""}
        `}
      >
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
        )}

        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all ${value ? "bg-black/40 opacity-0 hover:opacity-100" : "opacity-100"}`}>
          {uploading ? (
            <>
              <div className="w-8 h-8 border-[3px] border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-white drop-shadow">আপলোড হচ্ছে...</p>
            </>
          ) : value ? (
            <>
              <FaCheck className="text-2xl text-white drop-shadow" />
              <p className="text-xs font-bold text-white drop-shadow">পরিবর্তন করতে ক্লিক করুন</p>
            </>
          ) : (
            <>
              <MdImage className={`text-4xl ${dragOver ? "text-yellow-500" : "text-gray-400"}`} />
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 text-center px-4">
                ক্লিক করুন বা ছবি টেনে আনুন
              </p>
              <p className="text-[10px] text-gray-400">PNG, JPG, WEBP — সর্বোচ্চ ১০MB</p>
            </>
          )}
        </div>

        {value && !uploading && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(""); }}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg z-10"
          >
            <FaTimes className="text-xs" />
          </button>
        )}

        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-yellow-500 animate-pulse w-full" />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
