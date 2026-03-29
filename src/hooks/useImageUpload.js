"use client";
import { useState } from "react";
import { toast } from "sonner";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  // Single file upload — shows toast
  const upload = async (file, { silent = false } = {}) => {
    if (!file) return null;
    setUploading(true);

    const toastId = silent ? null : toast.loading("ছবি আপলোড হচ্ছে...", {
      description: file.name,
    });

    try {
      const form = new FormData();
      form.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: form }
      );
      const data = await res.json();
      if (data.success) {
        if (toastId) toast.success("ছবি আপলোড সফল!", { id: toastId, description: file.name });
        return data.data.url;
      }
      throw new Error(data.error?.message || "Upload failed");
    } catch (err) {
      if (toastId) toast.error("আপলোড ব্যর্থ হয়েছে", { id: toastId, description: err.message });
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Multiple files upload — shows progress toast
  const uploadMultiple = async (files) => {
    if (!files?.length) return [];
    setUploading(true);

    const total = files.length;
    const toastId = toast.loading(`০/${total} ছবি আপলোড হচ্ছে...`, {
      description: `মোট ${total}টি ছবি আপলোড শুরু হয়েছে`,
    });

    const results = [];
    let done = 0;

    for (const file of files) {
      try {
        const form = new FormData();
        form.append("image", file);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
          { method: "POST", body: form }
        );
        const data = await res.json();
        if (data.success) {
          results.push(data.data.url);
          done++;
          toast.loading(`${done}/${total} ছবি আপলোড হয়েছে`, {
            id: toastId,
            description: `${file.name}`,
          });
        }
      } catch {
        // skip failed
      }
    }

    setUploading(false);

    if (results.length === total) {
      toast.success(`${total}টি ছবি সফলভাবে আপলোড হয়েছে! 🎉`, {
        id: toastId,
        description: "সব ছবি সংরক্ষণ করা হয়েছে",
      });
    } else if (results.length > 0) {
      toast.warning(`${results.length}/${total} ছবি আপলোড হয়েছে`, {
        id: toastId,
        description: `${total - results.length}টি ছবি আপলোড ব্যর্থ হয়েছে`,
      });
    } else {
      toast.error("কোনো ছবি আপলোড হয়নি", { id: toastId });
    }

    return results;
  };

  return { upload, uploadMultiple, uploading };
}
