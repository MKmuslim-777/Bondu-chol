import React from "react";
import Lottie from "lottie-react";

const LoginSuccessLoader = () => {
  // একটি সুন্দর গ্রিন টিক বা সাকসেস অ্যানিমেশন (অনলাইন থেকে সরাসরি লিঙ্ক করা)
  const successAnimation =
    "https://lottie.host/8e6c738e-9087-4363-8a35-21d96e41b212/Y0vD9j6b8n.json";

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-xs w-full text-center space-y-6 scale-110">
        {/* Success Animation */}
        <div className="w-48 h-48 mx-auto drop-shadow-2xl">
          <Lottie
            animationData={null} // আপনি যদি লোকাল ফাইল ইউজ করেন
            path={successAnimation}
            loop={false} // একবারই দেখাবে
          />
        </div>

        {/* Success Message */}
        <div className="space-y-2 animate-bounce">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            লগইন সফল!
          </h2>
          <p className="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-[0.2em] text-sm">
            ভিতরে নিয়ে যাওয়া হচ্ছে...
          </p>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default LoginSuccessLoader;
