"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSignOutAlt, FaBars, FaTimes, FaUserEdit, FaUsersCog,
  FaStar, FaChevronRight, FaBell, FaSearch, FaCalendarAlt,
  FaCog, FaComments, FaUsers,
} from "react-icons/fa";
import { MdDashboard, MdAdminPanelSettings, MdSecurity } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";

const commonMenu = [
  { name: "Overview",    path: "/dashboard",            icon: MdDashboard },
  { name: "My Profile",  path: "/dashboard/my-profile", icon: FaUserEdit  },
  { name: "Friends",     path: "/dashboard/all-friends", icon: FaUsers    },
];

const baraMenu = [
  { name: "Bara Chat",   path: "/dashboard/bara-chat",  icon: FaComments  },
];

const moderatorMenu = [
  { name: "Memories",    path: "/dashboard/moderator/memories", icon: FaCalendarAlt },
];

const adminMenu = [
  { name: "Users",       path: "/dashboard/admin/users",    icon: FaUsersCog    },
  { name: "Bara Members",path: "/dashboard/admin/bara",     icon: FaStar        },
  { name: "Events",      path: "/dashboard/admin/events",   icon: FaCalendarAlt },
  { name: "Settings",    path: "/dashboard/admin/settings", icon: FaCog         },
];

const allMenuItems = [...commonMenu, ...baraMenu, ...moderatorMenu, ...adminMenu];

const roleCfg = {
  admin:     { label: "Admin",     bg: "bg-red-500/20",    text: "text-red-400",    border: "border-red-500/30"    },
  moderator: { label: "Moderator", bg: "bg-blue-500/20",   text: "text-blue-400",   border: "border-blue-500/30"   },
  bara:      { label: "Bara",      bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  user:      { label: "Member",    bg: "bg-gray-500/20",   text: "text-gray-400",   border: "border-gray-500/30"   },
};

function NavItem({ item, pathname, onClick }) {
  const Icon = item.icon;
  const isActive = pathname === item.path;
  return (
    <Link href={item.path} onClick={onClick}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
        isActive
          ? "bg-yellow-500 text-gray-950 shadow-lg shadow-yellow-500/25"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
    >
      <Icon className={`text-base flex-shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`} />
      <span className="truncate">{item.name}</span>
      {isActive && <FaChevronRight className="ml-auto text-[10px] opacity-60" />}
    </Link>
  );
}

function SectionLabel({ label, icon: Icon }) {
  return (
    <div className="flex items-center gap-2 px-3 pt-5 pb-1.5">
      {Icon && <Icon className="text-[10px] text-gray-600" />}
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-600">{label}</span>
    </div>
  );
}

function PageTitle({ pathname }) {
  const match = allMenuItems.find((m) => m.path === pathname);
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400 dark:text-gray-500">Dashboard</span>
      {match && match.path !== "/dashboard" && (
        <>
          <FaChevronRight className="text-[10px] text-gray-400" />
          <span className="font-bold text-gray-700 dark:text-gray-200">{match.name}</span>
        </>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const { role, roleLoading } = useRole();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => { await signOutUser(); router.push("/auth/login"); };
  const close = () => setSidebarOpen(false);
  const rc = roleCfg[role] || roleCfg.user;
  const isBara = role === "bara" || role === "admin";
  const isMod  = role === "moderator" || role === "admin";
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f1117] flex">

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-[60] w-60 bg-gray-950 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5 flex-shrink-0">
          <Link href="/" className="text-white font-black text-lg tracking-tight">
            বন্ধু <span className="text-yellow-400">চল</span>
          </Link>
          <button onClick={close} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}&background=random`}
              alt="" className="w-9 h-9 rounded-full border-2 border-yellow-500/50 flex-shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate leading-tight">{user?.displayName || "—"}</p>
              <span className={`inline-block mt-0.5 text-[10px] font-black px-2 py-0.5 rounded-full border ${rc.bg} ${rc.text} ${rc.border}`}>
                {rc.label}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          <SectionLabel label="General" />
          {commonMenu.map((item) => <NavItem key={item.path} item={item} pathname={pathname} onClick={close} />)}

          {isBara && (
            <>
              <SectionLabel label="Bara" icon={() => <span className="text-yellow-500">⭐</span>} />
              {baraMenu.map((item) => <NavItem key={item.path} item={item} pathname={pathname} onClick={close} />)}
            </>
          )}

          {isMod && !isAdmin && (
            <>
              <SectionLabel label="Moderator" icon={MdSecurity} />
              {moderatorMenu.map((item) => <NavItem key={item.path} item={item} pathname={pathname} onClick={close} />)}
            </>
          )}

          {isAdmin && (
            <>
              <SectionLabel label="Moderator" icon={MdSecurity} />
              {moderatorMenu.map((item) => <NavItem key={item.path} item={item} pathname={pathname} onClick={close} />)}
              <SectionLabel label="Admin" icon={MdAdminPanelSettings} />
              {adminMenu.map((item) => <NavItem key={item.path} item={item} pathname={pathname} onClick={close} />)}
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <FaSignOutAlt className="text-base" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={close} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden" />
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-5 sticky top-0 z-40 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-all">
              <FaBars />
            </button>
            <PageTitle pathname={pathname} />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <FaSearch className="text-sm" />
            </button>
            <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              <FaBell className="text-sm" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full" />
            </button>
            <Link href="/dashboard/my-profile" className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || "U"}&background=random`}
                alt="" className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black text-gray-800 dark:text-white leading-tight">{user?.displayName?.split(" ")[0]}</p>
                <p className={`text-[10px] font-bold ${rc.text}`}>{rc.label}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 md:p-7">
          {roleLoading ? (
            <div className="flex items-center justify-center min-h-[60vh]"><Loading /></div>
          ) : (
            <motion.div key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
              {children}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
