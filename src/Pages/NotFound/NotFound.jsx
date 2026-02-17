import React from "react";
import { Link } from "react-router"; // নিশ্চিত হোন আপনি react-router-dom ব্যবহার করছেন
import { motion } from "framer-motion";
import { FaMapSigns, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6 py-24 transition-colors duration-500 overflow-hidden relative">
      {/* Background Decorative Elements - পাহাড়ের অবয়ব বা ম্যাপের মতো ফিল */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-yellow-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 dark:text-gray-900 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaMapSigns className="text-7xl md:text-9xl text-yellow-500 drop-shadow-2xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            রাস্তা হারিয়ে ফেলেছো,{" "}
            <span className="text-yellow-500">বন্ধু?</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            তুমি যে পথ খুঁজছো তা হয়তো আমাদের ম্যাপে নেই। চিন্তা করো না, সেরা
            ভ্রমণগুলো মাঝেমধ্যে ভুল পথেই শুরু হয়!
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-2xl shadow-xl shadow-yellow-500/20 transform transition-all active:scale-95 hover:shadow-2xl group"
          >
            <FaHome className="text-xl group-hover:-translate-y-1 transition-transform" />
            মূল পাতায় ফিরে চলো
          </Link>
        </motion.div>

        {/* Fun Footer Note */}
        <p className="mt-12 text-sm font-medium text-gray-400 dark:text-gray-600 italic">
          "ভুল পথে যাওয়া মানেই হারিয়ে যাওয়া নয়।"
        </p>
      </div>
    </div>
  );
};

export default NotFound;
