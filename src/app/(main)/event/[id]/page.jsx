"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import Loading from "@/components/shared/Loading";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaArrowLeft, FaTicketAlt, FaImages } from "react-icons/fa";
import { MdEventAvailable, MdEventBusy } from "react-icons/md";
import { useState } from "react";

const statusCfg = {
  upcoming: { label: "আসছে",      cls: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50", dot: "bg-yellow-500" },
  ongoing:  { label: "চলছে",      cls: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50",   dot: "bg-green-500 animate-pulse" },
  past:     { label: "শেষ হয়েছে", cls: "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",             dot: "bg-gray-400" },
};

function LightboxModal({ photos, index, onClose }) {
  const [current, setCurrent] = useState(index);
  return (
    <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl p-2">✕</button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p - 1 + photos.length) % photos.length); }}
        className="absolute left-4 text-white/70 hover:text-white text-3xl p-3"
      >‹</button>
      <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] w-full px-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[current]} alt="" className="w-full h-full object-contain rounded-xl" />
        <p className="text-center text-white/50 text-sm mt-3">{current + 1} / {photos.length}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent((p) => (p + 1) % photos.length); }}
        className="absolute right-4 text-white/70 hover:text-white text-3xl p-3"
      >›</button>
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const axios = useAxios();
  const [lightbox, setLightbox] = useState(null);

  const { isLoading, data: event } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios.get(`/events/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="min-h-screen pt-20 flex items-center justify-center"><Loading /></div>;
  if (!event) return <div className="min-h-screen pt-20 flex items-center justify-center text-gray-400">ইভেন্ট পাওয়া যায়নি</div>;

  const status = event.status || "upcoming";
  const sc = statusCfg[status] || statusCfg.upcoming;
  const photos = Array.isArray(event.photos) ? event.photos : [];

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16">
      {/* Hero cover */}
      <div className="relative h-64 md:h-96 overflow-hidden bg-gray-900">
        {event.coverURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.coverURL} alt={event.title} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.15),transparent_70%)] flex items-center justify-center">
            {status === "past" ? <MdEventBusy className="text-8xl text-gray-700" /> : <MdEventAvailable className="text-8xl text-yellow-500/20" />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-sm font-bold rounded-xl border border-white/20 transition-all"
        >
          <FaArrowLeft /> ফিরে যাও
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border backdrop-blur-sm ${sc.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
            </span>
            {event.category && (
              <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold rounded-full border border-white/20">{event.category}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {event.description && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">বিবরণ</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.description}</p>
              </div>
            )}

            {/* Photos gallery */}
            {photos.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                  <FaImages /> ইভেন্টের ছবি ({photos.length})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox(i)}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-xl">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">ইভেন্ট তথ্য</p>
              {formattedDate && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-yellow-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">তারিখ</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{formattedDate}</p>
                    {event.endDate && <p className="text-xs text-gray-400">পর্যন্ত {new Date(event.endDate).toLocaleDateString("bn-BD", { day: "numeric", month: "long" })}</p>}
                  </div>
                </div>
              )}
              {event.time && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-blue-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">সময়</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{event.time}</p>
                  </div>
                </div>
              )}
              {event.location && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">স্থান</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{event.location}</p>
                  </div>
                </div>
              )}
              {event.capacity && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                    <FaUsers className="text-green-500 text-sm" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ধারণক্ষমতা</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">সর্বোচ্চ {event.capacity} জন</p>
                  </div>
                </div>
              )}
            </div>

            {status !== "past" && (
              <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl shadow-lg shadow-yellow-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <FaTicketAlt /> যোগ দিতে চাই
              </button>
            )}
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <LightboxModal photos={photos} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
