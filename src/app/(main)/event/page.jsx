"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import Link from "next/link";
import Loading from "@/components/shared/Loading";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaArrowRight } from "react-icons/fa";
import { MdEventAvailable, MdEventBusy } from "react-icons/md";

const statusCfg = {
  upcoming: { label: "আসছে",      cls: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/50", dot: "bg-yellow-500" },
  ongoing:  { label: "চলছে",      cls: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50",   dot: "bg-green-500 animate-pulse" },
  past:     { label: "শেষ হয়েছে", cls: "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",             dot: "bg-gray-400" },
};

function getStatus(event) {
  if (event.status) return event.status;
  const now = new Date();
  const start = event.date ? new Date(event.date) : null;
  const end = event.endDate ? new Date(event.endDate) : null;
  if (!start) return "upcoming";
  if (end && now > end) return "past";
  if (now >= start) return "ongoing";
  return "upcoming";
}

function EventCard({ event }) {
  const status = getStatus(event);
  const sc = statusCfg[status] || statusCfg.upcoming;

  const formattedDate = event.date
    ? new Date(event.date).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <Link href={`/event/${event._id}`} className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${status === "past" ? "opacity-70" : ""}`}>
      {/* Cover */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950 flex-shrink-0">
        {event.coverURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.coverURL} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,179,8,0.2),transparent_60%)] flex items-center justify-center">
            {status === "past"
              ? <MdEventBusy className="text-6xl text-gray-600" />
              : <MdEventAvailable className="text-6xl text-yellow-500/40" />
            }
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border backdrop-blur-sm ${sc.cls}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
            {sc.label}
          </span>
        </div>
        {event.category && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold rounded-full border border-white/20">
              {event.category}
            </span>
          </div>
        )}
        {/* Photo count badge */}
        {event.photos?.length > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
              📷 {event.photos.length}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-gray-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-yellow-500 transition-colors">
          {event.title}
        </h3>
        {event.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">{event.description}</p>
        )}

        <div className="mt-auto space-y-2">
          {formattedDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaCalendarAlt className="text-yellow-500 flex-shrink-0" />
              <span>{formattedDate}{event.endDate && ` — ${new Date(event.endDate).toLocaleDateString("bn-BD", { day: "numeric", month: "long" })}`}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaClock className="text-yellow-500 flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaMapMarkerAlt className="text-yellow-500 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
          {event.capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaUsers className="text-yellow-500 flex-shrink-0" />
              <span>সর্বোচ্চ {event.capacity} জন</span>
            </div>
          )}
        </div>

        {event.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {event.tags.map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold rounded-lg">#{t}</span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">বিস্তারিত দেখুন</span>
          <FaArrowRight className="text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all text-sm" />
        </div>
      </div>
    </Link>
  );
}

const FILTERS = [
  { key: "all",      label: "সব ইভেন্ট" },
  { key: "upcoming", label: "আসছে" },
  { key: "ongoing",  label: "চলছে" },
  { key: "past",     label: "শেষ হয়েছে" },
];

export default function EventPage() {
  const axios = useAxios();
  const [activeFilter, setActiveFilter] = useState("all");

  const { isLoading, data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get("/events");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filtered = events.filter((e) =>
    activeFilter === "all" ? true : getStatus(e) === activeFilter
  );

  const counts = FILTERS.reduce((acc, f) => {
    acc[f.key] = f.key === "all"
      ? events.length
      : events.filter((e) => getStatus(e) === f.key).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Hero */}
      <div className="bg-gray-950 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,179,8,0.1),transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-yellow-500 text-sm font-bold uppercase tracking-widest mb-3">বন্ধু চল</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            আমাদের <span className="text-yellow-400">ইভেন্ট</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            একসাথে আড্ডা, ট্যুর, আর অ্যাডভেঞ্চার — সব কিছুর খবর এখানে।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeFilter === f.key
                  ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20"
                  : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-yellow-400"
              }`}
            >
              {f.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${
                activeFilter === f.key ? "bg-black/20 text-black" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
              }`}>
                {counts[f.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <MdEventAvailable className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 font-bold text-lg">কোনো ইভেন্ট পাওয়া যায়নি</p>
            <p className="text-gray-500 text-sm mt-1">শীঘ্রই নতুন ইভেন্ট আসছে...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}
