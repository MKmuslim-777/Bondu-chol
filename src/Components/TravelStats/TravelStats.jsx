import React from "react";
import {
  FaMapMarkedAlt,
  FaCameraRetro,
  FaRoute,
  FaUsers,
} from "react-icons/fa";

const TravelStats = () => {
  const stats = [
    {
      id: 1,
      icon: <FaMapMarkedAlt className="text-4xl text-yellow-500" />,
      count: "১২+",
      label: "জেলা ভ্রমণ",
    },
    {
      id: 2,
      icon: <FaRoute className="text-4xl text-yellow-500" />,
      count: "৪৫০০+",
      label: "কিলোমিটার পথ",
    },
    {
      id: 3,
      icon: <FaCameraRetro className="text-4xl text-yellow-500" />,
      count: "১৫০০+",
      label: "সেরা স্মৃতি",
    },
    {
      id: 4,
      icon: <FaUsers className="text-4xl text-yellow-500" />,
      count: "১৩",
      label: "পাগল বন্ধু",
    },
  ];

  return (
    // bg-white (Light) এবং dark:bg-gray-950 (Dark)
    <div className="py-20 bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
            আমাদের{" "}
            <span className="text-yellow-500 underline decoration-wavy underline-offset-8">
              অর্জন
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 italic mt-6 text-lg">
            "পথ চলাই আমাদের আনন্দ, গন্তব্য তো কেবল একটি অজুহাত।"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-transparent hover:border-yellow-500/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group"
            >
              {/* Icon container with background glow in dark mode */}
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">{stat.icon}</div>
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-gray-100 tracking-tighter">
                {stat.count}
              </h3>

              <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex justify-center items-center mt-20 opacity-30">
        <div className="h-[1px] w-20 md:w-40 bg-gradient-to-r from-transparent to-gray-400 dark:to-gray-600"></div>
        <div className="mx-6 text-[10px] md:text-xs text-gray-500 dark:text-white tracking-[0.3em] font-black uppercase whitespace-nowrap">
          আমাদের পথচলা চলবেই
        </div>
        <div className="h-[1px] w-20 md:w-40 bg-gradient-to-l from-transparent to-gray-400 dark:to-gray-600"></div>
      </div>
    </div>
  );
};

export default TravelStats;
