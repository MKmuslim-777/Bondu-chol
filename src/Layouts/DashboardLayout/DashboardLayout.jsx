import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaImages,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Logo from "../../Shared/Logo";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const { role } = useRole();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "ওভারভিউ", path: "/dashboard", icon: <FaHome /> },
    {
      name: "আমার স্মৃতিমালা",
      path: "/dashboard/my-memories",
      icon: <FaImages />,
    },
    { name: "বন্ধু তালিকা", path: "/dashboard/friends", icon: <FaUsers /> },
    { name: "সেটিংস", path: "/dashboard/settings", icon: <FaCog /> },
  ];

  const handleLogout = async () => {
    await signOutUser();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors duration-500 overflow-x-hidden">
      {/* --- Sidebar / Mobile Drawer --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 transform 
        ${isSidebarOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:w-72"}`}
      >
        <div className="p-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <Logo />
          {/* মোবাইলে ড্রয়ার বন্ধ করার বাটন */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-500 hover:text-yellow-500 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-grow mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                  isActive
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-4 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
          >
            <FaSignOutAlt className="text-xl" />
            <span>লগআউট</span>
          </button>
        </div>
      </aside>

      {/* --- Overlay (ড্রয়ার খোলা থাকলে ব্যাকগ্রাউন্ড আবছা করবে) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- Main Content Area --- */}
      <main className="flex-grow transition-all duration-300 lg:ml-72 w-full">
        {/* Navbar */}
        <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black dark:text-white leading-tight">
                {user?.displayName || "বন্ধু চল"}
              </p>
              <p className="text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest">
                {role === "friends" ? "বন্ধুমহল মেম্বার" : "অ্যাডমিন"}
              </p>
            </div>

            <Link to="/dashboard/my-profile" className="relative group">
              <img
                src={user?.photoURL || "https://i.pravatar.cc/150"}
                alt="User"
                className="w-11 h-11 rounded-full border-2 border-yellow-500 p-0.5 cursor-pointer hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-pulse -z-10 group-hover:scale-125 transition-transform"></div>
            </Link>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto pb-28 lg:pb-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

      {/* --- Mobile Bottom Nav (Visible only for friends role) --- */}
      {role === "friends" && (
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 flex justify-around items-center p-3 z-50 rounded-3xl shadow-2xl">
          <Link
            to="/dashboard"
            className={`p-3 rounded-2xl ${location.pathname === "/dashboard" ? "text-yellow-500 bg-yellow-500/10" : "text-gray-400"}`}
          >
            <FaHome className="text-2xl" />
          </Link>
          <Link
            to="/dashboard/my-memories"
            className={`p-3 rounded-2xl ${location.pathname === "/dashboard/my-memories" ? "text-yellow-500 bg-yellow-500/10" : "text-gray-400"}`}
          >
            <FaImages className="text-2xl" />
          </Link>
          <Link
            to="/dashboard/friends"
            className={`p-3 rounded-2xl ${location.pathname === "/dashboard/friends" ? "text-yellow-500 bg-yellow-500/10" : "text-gray-400"}`}
          >
            <FaUsers className="text-2xl" />
          </Link>

          {/* এই বাটনটিই বাম পাশের ড্রয়ারটি খুলবে */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 rounded-2xl text-gray-400 hover:text-yellow-500 transition-colors"
          >
            <FaBars className="text-2xl" />
          </button>
        </nav>
      )}
    </div>
  );
};

export default DashboardLayout;
