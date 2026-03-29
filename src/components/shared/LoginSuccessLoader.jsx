"use client";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

export default function LoginSuccessLoader() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://lottie.host/8e6c738e-9087-4363-8a35-21d96e41b212/Y0vD9j6b8n.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative p-10 md:p-16 text-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-yellow-400/30 blur-[120px] rounded-full animate-pulse"></div>
        <div className="w-56 h-56 md:w-64 md:h-64 mx-auto">
          {animationData && (
            <Lottie animationData={animationData} loop={false} className="drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]" />
          )}
        </div>
        <div className="mt-4 space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter"
          >
            স্বাগতম, <span className="text-yellow-500">বন্ধু!</span>
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-gray-600 dark:text-gray-400 font-medium text-lg">
              তোমার অ্যাকাউন্টটি সফলভাবে লগইন হয়েছে।
            </p>
            <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mt-4 overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
