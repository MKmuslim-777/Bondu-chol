import React, { useState, useEffect } from "react";

const Memories = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/memories")
      .then((res) => res.json())
      .then((data) => setImages(data));

    const sorted = [...images].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, []);

  return (
    <section className="py-24 bg-[#fdfdfd]">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            আমাদের{" "}
            <span className="text-yellow-500 relative inline-block">
              স্মৃতিমালা
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="#EAB308"
                  strokeWidth="4"
                  fill="transparent"
                />
              </svg>
            </span>
          </h2>
          <p className="mt-8 text-gray-600 text-lg font-medium">
            প্রতিটি ছবি এক একটি গল্প, প্রতিটি সফর এক একটি নতুন পরিচয়।
          </p>
        </div>

        {/* ইমপ্রুভড গ্যালারি গ্রিড */}
        <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-8">
          {images.map((item, index) => (
            <div
              key={item.id || index}
              className="break-inside-avoid relative overflow-hidden rounded-3xl group cursor-pointer border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* ইমেজ কন্টেইনার */}
              <div className="overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110"
                />
              </div>

              {/* স্মার্ট গ্লাস-মর্ফিজম ওভারলে */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="bg-yellow-500 text-black text-[10px] font-black uppercase px-2 py-1 rounded-full mb-3 inline-block">
                    {item.location}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs font-light">
                    {new Date(item.createdAt).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* 'New' ব্যাজ শুধুমাত্র সব শেষ ৩টি ছবির জন্য */}
              {index < 3 && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                    নতুন স্মৃতি ✨
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* নিচে সুন্দর একটি মেসেজ */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-sm">পথ চলা এখনও শেষ হয়নি...</p>
        </div>
      </div>
    </section>
  );
};

export default Memories;
