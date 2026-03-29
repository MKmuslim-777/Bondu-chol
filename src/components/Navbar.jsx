"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaImage, FaUsers, FaCalendarAlt, FaMapMarkedAlt, FaTimes, FaUserCircle, FaTachometerAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useRole } from "@/hooks/useRole";
import Logo from "./shared/Logo";

const navLinks = [
  { href: "/", label: "হোম", icon: <FaHome /> },
  { href: "/all-friends", label: "বন্ধুরা", icon: <FaUsers /> },
  { href: "/gallery", label: "গ্যালারি", icon: <FaImage /> },
  { href: "/event", label: "ইভেন্ট", icon: <FaCalendarAlt /> },
  { href: "/tour", label: "ট্যুর", icon: <FaMapMarkedAlt /> },
];

const roleMeta = {
  admin: { label: "Admin", cls: "bg-red-500 text-white" },
  moderator: { label: "Mod", cls: "bg-blue-500 text-white" },
  bara: { label: "Bara", cls: "bg-yellow-500 text-black" },
  user: { label: "Member", cls: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200" },
};

function NavLink({ href, label, icon, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
        isActive
          ? "bg-yellow-400/20 text-yellow-500"
          : "text-gray-600 dark:text-gray-300 hover:text-yellow-500 hover:bg-yellow-400/10"
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { user, signOutUser } = useAuth();
  const { role } = useRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setDropOpen(false); setMenuOpen(false); }, [pathname]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("লগআউট সফল"))
      .catch((e) => toast.error(e.message));
  };

  const rm = roleMeta[role] || roleMeta.user;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100 dark:border-gray-800"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => <NavLink key={l.href} {...l} />)}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-yellow-400 transition-all bg-white dark:bg-gray-900 shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 hidden sm:block max-w-[100px] truncate">
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${rm.cls}`}>{rm.label}</span>
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                        <p className="font-black text-gray-800 dark:text-white text-sm truncate">{user.displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 hover:text-yellow-600 transition-all">
                          <FaTachometerAlt /> Dashboard
                        </Link>
                        <Link href="/dashboard/my-profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                          <FaUserCircle /> প্রোফাইল
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                        >
                          <IoLogOutOutline className="text-lg" /> লগআউট
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {dropOpen && <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                  লগইন
                </Link>
                <Link href="/auth/register" className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all hover:-translate-y-0.5">
                  যোগ দাও
                </Link>
              </div>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
            >
              <HiMenuAlt3 className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-950 z-[1001] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                <Logo />
                <button onClick={() => setMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
                  <FaTimes />
                </button>
              </div>

              {user && (
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="" className="w-10 h-10 rounded-full" />
                  <div className="min-w-0">
                    <p className="font-black text-sm text-gray-800 dark:text-white truncate">{user.displayName}</p>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${rm.cls}`}>{rm.label}</span>
                  </div>
                </div>
              )}

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 mb-2">মেনু</p>
                {navLinks.map((l) => <NavLink key={l.href} {...l} onClick={() => setMenuOpen(false)} />)}
                {user && (
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mt-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3 mb-2">অ্যাকাউন্ট</p>
                    <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 hover:text-yellow-500 transition-all">
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <Link href="/dashboard/my-profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                      <FaUserCircle /> প্রোফাইল
                    </Link>
                  </div>
                )}
              </nav>

              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <button onClick={handleSignOut} className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                    <IoLogOutOutline className="text-lg" /> লগআউট
                  </button>
                ) : (
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-sm font-black text-gray-700 dark:text-white hover:border-yellow-400 transition-all">
                    লগইন করো
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
