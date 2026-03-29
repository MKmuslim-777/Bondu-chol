"use client";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { FaDownload, FaTimes } from "react-icons/fa";

export default function PWAInstall() {
  const deferredPrompt = useRef(null);
  const shown = useRef(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handler = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;

      // Show only once per session
      if (shown.current) return;
      shown.current = true;

      // Small delay so page loads first
      setTimeout(() => {
        toast.custom(
          (t) => (
            <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-yellow-400/50 rounded-2xl shadow-xl px-4 py-3 w-full max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-lg">🏕️</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-gray-800 dark:text-white">বন্ধু চল ইন্সটল করো</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Home screen এ যোগ করো, সহজে ব্যবহার করো</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={async () => {
                    toast.dismiss(t);
                    if (!deferredPrompt.current) return;
                    deferredPrompt.current.prompt();
                    const { outcome } = await deferredPrompt.current.userChoice;
                    deferredPrompt.current = null;
                    if (outcome === "accepted") {
                      toast.success("ইন্সটল সফল! 🎉", { description: "বন্ধু চল আপনার ফোনে যোগ হয়েছে" });
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black rounded-xl transition-all shadow-sm"
                >
                  <FaDownload className="text-[10px]" /> ইন্সটল
                </button>
                <button
                  onClick={() => toast.dismiss(t)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>
          ),
          { duration: 15000, position: "bottom-center" }
        );
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return null;
}
