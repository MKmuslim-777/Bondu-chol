import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const LoginSuccessLoader = () => {
  // প্রিমিয়াম সাকসেস চেক অ্যানিমেশন
  const successAnimation =
    "https://lottie.host/8e6c738e-9087-4363-8a35-21d96e41b212/Y0vD9j6b8n.json";

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl transition-colors duration-500">
      {/* মেইন কন্টেইনার অ্যানিমেশন */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative p-10 md:p-16 text-center"
      >
        {/* গ্লো ইফেক্ট (পেছনের আলো) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-yellow-400/30 blur-[120px] rounded-full animate-pulse"></div>

        {/* Lottie Animation */}
        <div className="w-56 h-56 md:w-64 md:h-64 mx-auto relative">
          <Lottie
            path={successAnimation}
            loop={false}
            className="drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]"
          />
        </div>

        {/* Text Section with Staggered Animation */}
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
              তোমার অ্যাকাউন্টটি সফলভাবে লগইন হয়েছে।
            </p>

            {/* কাস্টম প্রগ্রেস বার লোডার (নিচে চলছে এমন ফিল দিবে) */}
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

      {/* কনফেটি ইফেক্ট (নিচ থেকে উপরে ওঠার ফিল) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-75"></div>
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-yellow-600 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
      </motion.div>
    </div>
  );
};

export default LoginSuccessLoader;
