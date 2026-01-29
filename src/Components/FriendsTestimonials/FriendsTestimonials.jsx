import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FriendsTestimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "রাকিব হাসান",
      role: "সহযাত্রী",
      comment:
        "সাজেক ভ্যালির সেই রাতটা কখনো ভুলব না। বন্ধুদের সাথে আড্ডা আর পাহাড়ের মেঘ—সব মিলিয়ে জীবনটাই বদলে গেছে!",
      image: "https://i.pravatar.cc/150?u=rakib",
    },
    {
      id: 2,
      name: "তানভীর আহমেদ",
      role: "ফটোগ্রাফার বন্ধু",
      comment:
        "কক্সবাজারের সমুদ্র সৈকতে ফুটবল খেলা আর সূর্যাস্ত দেখা ছিল আমাদের ট্রিপের সেরা মুহূর্ত। আবার কবে যাচ্ছি?",
      image: "https://i.pravatar.cc/150?u=tanvir",
    },
    {
      id: 3,
      name: "সাদিয়া আফরিন",
      role: "টিম লিডার",
      comment:
        "সিলেটের চা বাগানে বৃষ্টিতে ভেজা আর চা খাওয়ার স্মৃতিগুলো এখনো মনে পড়লে মনটা ভালো হয়ে যায়। সেরা ট্রিপ ছিল!",
      image: "https://i.pravatar.cc/150?u=sadia",
    },
    {
      id: 4,
      name: "আরিফ বিল্লাহ",
      role: "ভোজনরসিক",
      comment:
        "সুন্দরবনের সেই ক্যাম্পিং আর বনের গহীন নিস্তব্ধতা অন্যরকম এক রোমাঞ্চ ছিল। বন্ধুরাই আসল শক্তি!",
      image: "https://i.pravatar.cc/150?u=arif",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            বন্ধুদের <span className="text-yellow-500">অনুভূতি</span>
          </h2>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true} // এটি স্লাইডারকে অসীম লুপে চালাবে
          autoplay={{
            delay: 3000, // ৩ সেকেন্ড পর পর স্লাইড হবে
            disableOnInteraction: false, // ইউজার টাচ করার পরেও অটো চলতে থাকবে
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper !pb-14"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="max-w-3xl mx-auto py-6">
                <div className="relative bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2rem] shadow-2xl dark:shadow-yellow-500/5 border border-gray-100 dark:border-gray-700 text-center transform transition-all">
                  {/* Floating Quote Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg z-10">
                    <FaQuoteLeft className="text-white text-xl" />
                  </div>

                  {/* Comment Text */}
                  <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed italic mb-8">
                    "{review.comment}"
                  </p>

                  {/* User Info */}
                  <div className="flex flex-col items-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-20 h-20 rounded-full border-4 border-yellow-500 p-1 mb-4 object-cover shadow-md"
                    />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {review.name}
                    </h4>
                    <p className="text-sm text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #eab308 !important;
          transform: scale(0.6);
          background: rgba(255, 255, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-pagination-bullet-active {
          background: #eab308 !important;
          width: 25px !important;
          border-radius: 5px !important;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsTestimonials;
