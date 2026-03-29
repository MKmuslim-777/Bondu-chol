"use client";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Link from "next/link";
import {
  FaUsers, FaImages, FaImage, FaUsersCog, FaStar,
  FaArrowRight, FaCalendarAlt, FaCog, FaEye, FaComments,
} from "react-icons/fa";
import { MdSecurity, MdAdminPanelSettings } from "react-icons/md";

function StatCard({ label, value, icon: Icon, color, href }) {
  const inner = (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group ${href ? "cursor-pointer hover:border-yellow-400/50" : ""}`}>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md flex-shrink-0`}>
        <Icon className="text-white text-xl" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-black text-gray-800 dark:text-white">{value ?? "—"}</p>
        <p className="text-xs text-gray-400 font-bold mt-0.5">{label}</p>
      </div>
      {href && <FaArrowRight className="ml-auto text-gray-300 dark:text-gray-700 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all text-sm flex-shrink-0" />}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function ActionCard({ title, desc, href, icon: Icon, color }) {
  return (
    <Link href={href} className="group relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-md`}>
        <Icon className="text-white" />
      </div>
      <p className="font-black text-gray-800 dark:text-white text-sm mb-1">{title}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
      <FaArrowRight className="absolute bottom-4 right-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-500 group-hover:translate-x-1 transition-all text-xs" />
    </Link>
  );
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { role } = useRole();
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const { data: events = [] } = useQuery({
    queryKey: ["stat-events"],
    queryFn: async () => { const r = await axios.get("/events"); return r.data || []; },
  });
  const { data: memories = [] } = useQuery({
    queryKey: ["stat-memories"],
    queryFn: async () => { const r = await axios.get("/memories"); return r.data || []; },
  });
  const { data: gallery = [] } = useQuery({
    queryKey: ["stat-gallery"],
    queryFn: async () => { const r = await axios.get("/gallery"); return r.data || []; },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["stat-users"],
    enabled: role === "admin",
    queryFn: async () => { const r = await axiosSecure.get("/users"); return r.data || []; },
  });

  const isAdmin = role === "admin";
  const isMod   = role === "moderator" || role === "admin";
  const isBara  = role === "bara" || role === "admin";

  const adminActions = [
    { title: "User Management",  desc: "Manage members & roles",       href: "/dashboard/admin/users",    icon: FaUsersCog,    color: "from-violet-500 to-purple-600" },
    { title: "Bara Members",     desc: "View special Bara members",    href: "/dashboard/admin/bara",     icon: FaStar,        color: "from-yellow-400 to-orange-500" },
    { title: "Events",           desc: "Create & manage events",       href: "/dashboard/admin/events",   icon: FaCalendarAlt, color: "from-teal-500 to-cyan-600"     },
    { title: "Site Settings",    desc: "Gallery, memories & content",  href: "/dashboard/admin/settings", icon: FaCog,         color: "from-slate-500 to-gray-600"    },
  ];
  const modActions = [
    { title: "Review Memories",  desc: "View & manage memories",       href: "/dashboard/moderator/memories", icon: FaImages, color: "from-pink-500 to-rose-600" },
  ];
  const commonActions = [
    { title: "Friends",          desc: "View Bara members",            href: "/dashboard/all-friends",    icon: FaUsers,       color: "from-green-400 to-emerald-600" },
    { title: "Events",           desc: "Browse all events",            href: "/event",                    icon: FaCalendarAlt, color: "from-blue-400 to-indigo-600"   },
    { title: "Gallery",          desc: "Browse all photos",            href: "/gallery",                  icon: FaImage,       color: "from-pink-400 to-rose-500"     },
  ];
  const baraActions = [
    { title: "Bara Chat",        desc: "Chat with Bara members",       href: "/dashboard/bara-chat",      icon: FaComments,    color: "from-yellow-400 to-amber-500"  },
  ];

  const actions = [
    ...commonActions,
    ...(isBara ? baraActions : []),
    ...(isMod && !isAdmin ? modActions : []),
    ...(isAdmin ? [...modActions, ...adminActions] : []),
  ];

  return (
    <div className="space-y-7">

      {/* Welcome */}
      <div className="relative bg-gray-950 rounded-2xl p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,179,8,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-lg">
          <p className="text-yellow-400 text-sm font-bold mb-1">{greeting} 👋</p>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{user?.displayName || "Friend"}</h1>
          <p className="text-gray-400 text-sm">Welcome to your Bondu Chol dashboard.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all">
              <FaEye className="text-yellow-400" /> View Site
            </Link>
            <Link href="/dashboard/my-profile" className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs font-bold rounded-xl transition-all">
              Edit Profile
            </Link>
            {isBara && (
              <Link href="/dashboard/bara-chat" className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black rounded-xl transition-all">
                <FaComments /> Bara Chat
              </Link>
            )}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}&background=random`}
          alt="" className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl border-2 border-yellow-500/30 object-cover hidden sm:block opacity-80" />
      </div>

      {/* Role notices */}
      {isAdmin && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-2xl">
          <MdAdminPanelSettings className="text-red-500 text-2xl flex-shrink-0" />
          <div>
            <p className="font-black text-red-600 dark:text-red-400 text-sm">Admin Access Active</p>
            <p className="text-xs text-red-400 dark:text-red-500">You have full control over the platform.</p>
          </div>
        </div>
      )}
      {role === "moderator" && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 rounded-2xl">
          <MdSecurity className="text-blue-500 text-2xl flex-shrink-0" />
          <div>
            <p className="font-black text-blue-600 dark:text-blue-400 text-sm">Moderator Access</p>
            <p className="text-xs text-blue-400 dark:text-blue-500">You can manage content on the platform.</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Statistics</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Events"  value={events.length}   icon={FaCalendarAlt} color="from-teal-500 to-cyan-600"    href="/event"   />
          <StatCard label="Memories"      value={memories.length} icon={FaImages}      color="from-pink-500 to-rose-600"               />
          <StatCard label="Gallery Photos" value={gallery.length} icon={FaImage}       color="from-blue-500 to-indigo-600"  href="/gallery" />
          {isAdmin
            ? <StatCard label="Total Members" value={users.length} icon={FaUsers} color="from-violet-500 to-purple-600" href="/dashboard/admin/users" />
            : <StatCard label="Bara Members"  value={null}         icon={FaStar}  color="from-yellow-400 to-orange-500" href="/dashboard/all-friends" />
          }
        </div>
      </div>

      {/* Admin role breakdown */}
      {isAdmin && users.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Admin",     count: users.filter(u => u.role === "admin").length,                cls: "text-red-500"    },
            { label: "Moderator", count: users.filter(u => u.role === "moderator").length,            cls: "text-blue-500"   },
            { label: "Bara",      count: users.filter(u => u.role === "bara").length,                 cls: "text-yellow-500" },
            { label: "Member",    count: users.filter(u => u.role === "user" || !u.role).length,      cls: "text-gray-500"   },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center">
              <p className={`text-2xl font-black ${s.cls}`}>{s.count}</p>
              <p className="text-xs text-gray-400 font-bold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick actions */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Quick Access</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {actions.map((c) => <ActionCard key={c.href} {...c} />)}
        </div>
      </div>

      {/* Recent events */}
      {events.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Recent Events</p>
            <Link href="/event" className="text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors">View all →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.slice(0, 3).map((e) => (
              <Link key={e._id} href={`/event/${e._id}`} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md hover:border-yellow-400/50 transition-all">
                {e.coverURL && (
                  <div className="h-28 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.coverURL} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-black text-gray-800 dark:text-white text-sm truncate">{e.title}</p>
                  {e.date && <p className="text-xs text-gray-400 mt-1">{new Date(e.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
