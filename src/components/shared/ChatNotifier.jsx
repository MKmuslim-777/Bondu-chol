"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/hooks/useRole";
import { io } from "socket.io-client";
import { toast } from "sonner";

// Notification sound (short beep via Web Audio API — no external dependency)
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // AudioContext not available (SSR or blocked)
  }
}

let notifierSocket = null;

export default function ChatNotifier() {
  const { user } = useAuth();
  const { role } = useRole();
  const pathname = usePathname();
  const router = useRouter();
  const joinedRef = useRef(false);

  const isEligible = role === "bara" || role === "admin" || role === "moderator";
  const isOnChatPage = pathname === "/dashboard/bara-chat";

  useEffect(() => {
    if (!user || !isEligible) return;

    // Don't show notifications when already on chat page
    if (isOnChatPage) {
      // Disconnect notifier when on chat page (chat page has its own socket)
      if (notifierSocket) {
        notifierSocket.disconnect();
        notifierSocket = null;
        joinedRef.current = false;
      }
      return;
    }

    if (!notifierSocket) {
      notifierSocket = io({ path: "/api/socket", transports: ["websocket", "polling"] });
    }

    if (!joinedRef.current) {
      notifierSocket.on("connect", () => {
        notifierSocket.emit("join", {
          name: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          role,
        });
        joinedRef.current = true;
      });
    }

    const handleMessage = (msg) => {
      // Don't notify for own messages
      if (msg.email === user.email) return;

      playNotificationSound();

      toast(
        <div
          className="flex items-center gap-3 cursor-pointer w-full"
          onClick={() => router.push("/dashboard/bara-chat")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={msg.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(msg.name || "U")}&background=random`}
            alt={msg.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2 border-yellow-400/50"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-gray-800 dark:text-white truncate">{msg.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{msg.text}</p>
          </div>
          <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 flex-shrink-0">Bara Chat →</span>
        </div>,
        {
          duration: 5000,
          icon: "💬",
          style: { padding: "8px 12px", cursor: "pointer" },
        }
      );
    };

    notifierSocket.on("message", handleMessage);

    return () => {
      notifierSocket?.off("message", handleMessage);
    };
  }, [user, role, isEligible, isOnChatPage, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (notifierSocket) {
        notifierSocket.disconnect();
        notifierSocket = null;
        joinedRef.current = false;
      }
    };
  }, []);

  return null;
}
