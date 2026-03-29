"use client";
import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

export default function RefreshButton({ onRefresh, className = "" }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = async () => {
    if (spinning) return;
    setSpinning(true);
    await onRefresh();
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      title="Refresh"
      className={`p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-yellow-500 hover:border-yellow-400 bg-white dark:bg-gray-900 transition-all ${className}`}
    >
      <FiRefreshCw className={`text-sm ${spinning ? "animate-spin" : ""}`} />
    </button>
  );
}
