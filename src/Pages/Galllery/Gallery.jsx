import React from "react";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Shared/Loaders/Loading";
import { useQuery } from "@tanstack/react-query";

const Gallery = () => {
  const axios = useAxios();

  const { isLoading, data: images = [] } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await axios.get("/gallery");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Explore Our <span className="text-blue-600">Funny Moments</span>
        </h2>
        <p className="text-gray-500 mt-2">
          মজার সব মুহুর্তগুলো এক ঝলক দেখে নিন আমাদের গ্যালারিতে।
        </p>
      </div>

      {/* Gallery Grid - Bento Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[700px]">
        {images.slice(0, 6).map((img, index) => (
          <div
            key={img._id || index}
            className={`overflow-hidden rounded-2xl group relative shadow-md`}
          >
            {/* Image */}
            <img
              src={img.url}
              alt="Gallery Moment"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Subtle Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
