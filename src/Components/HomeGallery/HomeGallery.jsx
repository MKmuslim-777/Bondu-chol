import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaExpandAlt } from "react-icons/fa";
import { Link } from "react-router";

const HomeGallery = () => {
  const [memories, setMemories] = useState([
    {
      id: 1,
      img: "https://i.ibb.co.com/YT3hCgHQ/PXL-20260123-110320436-MP-2.jpg",
      loves: 12,
      category: "Travel",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/8DNcny8Z/PXL-20251031-075108754-MP.jpg",
      loves: 45,
      category: "Travel",
    },
    {
      id: 3,
      img: "https://i.ibb.co.com/LzgpTLJn/PXL-20251105-170603445-NIGHT.jpg",
      loves: 8,
      category: "New Bridge",
    },
    {
      id: 4,
      img: "https://i.ibb.co.com/5X7y5qBg/PXL-20250927-142139832.jpg",
      loves: 22,
      category: "Event",
    },
    {
      id: 5,
      img: "https://i.ibb.co.com/5W7D09XZ/IMG-20251031-154457.jpg",
      loves: 31,
      category: "Nature",
    },
    {
      id: 6,
      img: "https://i.ibb.co.com/23QqVdzg/PXL-20250927-142118168-MP.jpg",
      loves: 31,
      category: "Event",
    },
    {
      id: 7,
      img: "https://i.ibb.co.com/zTsZBp07/PXL-20251127-180007922-MP.jpg",
      loves: 31,
      category: "Event",
    },
  ]);

  const handleLove = (id) => {
    setMemories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, loves: item.loves + 1 } : item,
      ),
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h2 className="text-4xl font-black text-black dark:text-white tracking-tight">
            আলোকচিত্র <span className="text-rose-500">.</span>
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            আমাদের ফ্রেমবন্দি মুহূর্তগুলো
          </p>
        </div>
        <Link
          to={"/gallery"}
          className="hidden md:block text-sm font-bold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          View All
        </Link>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group break-inside-avoid rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img
                src={memory.img}
                alt="gallery"
                className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                  {memory.category}
                </span>
              </div>

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLove(memory.id)}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-rose-500 transition-colors group/heart"
                    >
                      <FaHeart className="w-5 h-5 group-active/heart:scale-150 transition-transform" />
                    </button>
                    <div>
                      <p className="text-white font-bold text-lg leading-none">
                        {memory.loves}
                      </p>
                      <p className="text-gray-300 text-xs uppercase tracking-tighter">
                        Loves
                      </p>
                    </div>
                  </div>

                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                    <FaExpandAlt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <Link
          to={"/gallery"}
          className="block md:hidden mx-auto text-center w-[150px] text-sm font-bold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default HomeGallery;
