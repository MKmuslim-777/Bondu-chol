"use client";
import { toast } from "sonner";

/**
 * showConfirm — sonner দিয়ে সুন্দর confirmation toast দেখায়
 * @param {object} opts
 * @param {string} opts.title - প্রধান বার্তা
 * @param {string} opts.description - বিস্তারিত
 * @param {string} opts.confirmLabel - confirm button text
 * @param {string} opts.cancelLabel - cancel button text
 * @param {"danger"|"warning"} opts.variant
 * @param {function} opts.onConfirm - confirm এ কী করবে
 */
export function showConfirm({
  title,
  description,
  confirmLabel = "হ্যাঁ, নিশ্চিত",
  cancelLabel = "বাতিল",
  variant = "danger",
  onConfirm,
}) {
  const colors = {
    danger:  { btn: "bg-red-500 hover:bg-red-600 text-white",   icon: "🗑️" },
    warning: { btn: "bg-yellow-500 hover:bg-yellow-600 text-black", icon: "⚠️" },
  };
  const c = colors[variant] || colors.danger;

  toast.custom(
    (id) => (
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-5 w-80 max-w-full">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl flex-shrink-0">{c.icon}</span>
          <div>
            <p className="font-black text-gray-800 dark:text-white text-sm">{title}</p>
            {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{description}</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.dismiss(id)}
            className="flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => { toast.dismiss(id); onConfirm(); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${c.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    ),
    { duration: Infinity, position: "top-center" }
  );
}
