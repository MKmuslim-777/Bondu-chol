import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "../Shared/Loaders/Loading";

const Memories = () => {
  const axios = useAxios();

  const { isLoading, data: images } = useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      const res = await axios.get("/memories");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // console.log(images);

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-3 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            আমাদের{" "}
            <span className="text-yellow-500 relative inline-block">
              স্মৃতিমালা
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="#EAB308"
                  strokeWidth="3"
                  fill="transparent"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base font-medium italic">
            "ফেলে আসা দিনগুলোর সোনালী মুহূর্ত"
          </p>
        </div>

        {/* Reels Style Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
          {images.map((item, index) => (
            <div
              key={item.id || index}
              className="relative aspect-[9/16] overflow-hidden rounded-2xl md:rounded-[2rem] group cursor-pointer border border-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* Status Badge - রিসেন্টলি ব্যাজ */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                {index === 0 ? (
                  <span className="bg-red-600 text-white text-[9px] md:text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-red-500">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                    সর্বশেষ আয়োজন
                  </span>
                ) : index < 3 ? (
                  <span className="bg-yellow-500/90 backdrop-blur-sm text-black text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full">
                    রিসেন্টলি
                  </span>
                ) : (
                  <span className="bg-black/30 backdrop-blur-md text-white text-[9px] md:text-[10px] px-2.5 py-1 rounded-full border border-white/20 font-light">
                    {item.location}
                  </span>
                )}
              </div>

              {/* Info Bottom */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-[15px] md:text-lg font-bold leading-tight line-clamp-2 mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between opacity-80">
                  <span className="text-gray-300 text-[10px] md:text-xs">
                    {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  {/* Location Icon for Desktop */}
                  <div className="hidden md:flex items-center gap-1 text-white text-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-xs md:text-sm flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gray-200"></span>
            আমাদের পথচলা চলবেই...
            <span className="h-px w-8 bg-gray-200"></span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Memories;
