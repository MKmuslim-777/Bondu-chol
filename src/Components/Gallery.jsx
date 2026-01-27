import React from "react";

const Gallery = () => {
  const images = [
    "https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg",
    "https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg",
    "https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg",
    "https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg",
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            আমাদের <span className="text-yellow-500">স্মৃতিমালা</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-2"></div>
          <p className="text-gray-500 mt-4 text-lg italic">
            ফেলে আসা দিনগুলোর কিছু মুহূর্ত
          </p>
        </div>

        {/* Image Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              <img
                src={src}
                alt={`Travel Memory ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-white font-semibold text-lg">
                    সুন্দর মুহূর্ত #{index + 1}
                  </p>
                  <p className="text-yellow-400 text-sm italic">
                    জানুয়ারি, ২০২৬
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
