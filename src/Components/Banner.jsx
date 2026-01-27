import React from "react";

const Banner = () => {
  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* কালচে ওভারলে যাতে লেখা ফুটে ওঠে */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter">
          বন্ধু <span className="text-yellow-400">চল</span>
        </h1>

        <p className="text-xl md:text-3xl text-gray-200 font-light tracking-widest uppercase mb-8">
          বন্ধু চল যাই দুনিয়া দেখি
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-sm transition-all duration-300">
            গল্পগুলো পড়ুন
          </button>
          <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black font-bold rounded-sm transition-all duration-300">
            গ্যালারি দেখুন
          </button>
        </div>
      </div>

      {/* নিচের দিকে স্ক্রল করার একটি ইন্ডিকেটর (Optional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-1 h-10 border-l-2 border-white/50 mx-auto"></div>
      </div>
    </div>
  );
};

export default Banner;
