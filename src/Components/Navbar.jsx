import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaImage,
  FaUsers,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { GoShieldCheck, GoSignOut } from "react-icons/go";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import useTheme from "../Hooks/useTheme";
import Logo from "../Shared/Logo";
import ThemeToggle from "../Shared/ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { role } = useRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Logged out safely"))
      .catch((error) => toast.error(error.message));
  };

  // Human readable nav link styles
  const navLinkStyles = ({ isActive }) =>
    `relative flex items-center gap-2 px-4 py-2 text-[15px] font-semibold transition-all duration-300 rounded-full ${
      isActive
        ? "text-primary bg-primary/10 lg:bg-transparent lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-4 lg:after:right-4 lg:after:h-1 lg:after:bg-primary lg:after:rounded-full"
        : "text-slate-600 dark:text-slate-300 hover:text-primary opacity-80 hover:opacity-100"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          <FaHome className="text-lg" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/event" className={navLinkStyles}>
          <FaCalendarAlt className="text-lg" /> Event
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-friends" className={navLinkStyles}>
          <FaUsers className="text-lg" /> Friends
        </NavLink>
      </li>
      <li>
        <NavLink to="/tour" className={navLinkStyles}>
          <FaMapMarkedAlt className="text-lg" /> Tour
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery" className={navLinkStyles}>
          <FaImage className="text-lg" /> Gallery
        </NavLink>
      </li>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 w-full ${
        scrolled
          ? "py-2 bg-white/90 dark:bg-base-100/60 backdrop-blur-xl shadow-md border-b border-base-200"
          : "py-4 bg-white dark:bg-base-100"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        {/* Navbar Start: Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-2 hover:bg-primary/10 rounded-xl transition-colors"
          >
            <TiThMenu className="text-2xl text-slate-700 dark:text-slate-300" />
          </button>
          <div className="hover:opacity-80 transition-opacity">
            <Logo />
          </div>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-1">{links}</ul>
        </div>

        {/* Navbar End: Theme & User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end group">
              <label
                tabIndex={0}
                className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ring-2 ring-primary/20 ring-offset-2"
              >
                <div className="avatar online">
                  <div className="w-9 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        `https://ui-avatars.com/api/?name=${user?.displayName}`
                      }
                      alt="profile"
                    />
                  </div>
                </div>
                <FaChevronDown className="text-[10px] text-slate-400 group-hover:rotate-180 transition-transform hidden md:block" />
              </label>

              {/* Dropdown Content */}
              <div
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white dark:bg-base-100/95 backdrop-blur-md rounded-2xl w-64 border border-base-200"
              >
                {/* User Info Section */}
                <div className="flex flex-col items-center p-4 border-b border-base-100 dark:border-slate-800 mb-2">
                  <span className="font-bold text-lg text-black dark:text-white truncate w-full text-center">
                    {user?.displayName}
                  </span>
                  <span className="text-[11px] opacity-50 truncate w-full text-center uppercase tracking-tighter">
                    {role || user?.email}
                  </span>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-1">
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-slate-600 dark:text-slate-300 hover:text-primary transition-all"
                  >
                    <GoShieldCheck className="text-xl" />
                    <span className="font-medium">Dashboard</span>
                  </Link>

                  {/* Theme Toggle Component */}
                  <ThemeToggle />

                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 mt-1 font-bold transition-all"
                  >
                    <GoSignOut className="text-xl" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:block px-5 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 z-[1100] lg:hidden transition-all duration-300 ${isDrawerOpen ? "visible" : "invisible"}`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer Content */}
        <aside
          className={`absolute top-0 left-0 h-full w-80 bg-white dark:bg-base-100 shadow-2xl transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6 flex justify-between items-center border-b dark:border-base-200">
            <Logo />
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6 overflow-y-auto h-full flex flex-col">
            {/* Nav Links */}
            <div className="text-[10px] font-black text-base-content/30 mb-4 uppercase tracking-[3px]">
              Navigation
            </div>
            <ul
              className="space-y-2 flex-1"
              onClick={() => setIsDrawerOpen(false)}
            >
              {links}
            </ul>

            {/* Bottom Actions for Mobile */}
            <div className="mt-auto pt-6 border-t border-base-200">
              {!user ? (
                <Link
                  to="/auth/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-base-200 rounded-2xl hover:bg-base-200 transition-all text-black dark:text-white"
                >
                  Login Now
                </Link>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="w-full py-4 text-sm font-black uppercase tracking-widest bg-red-50 text-red-500 rounded-2xl dark:bg-red-900/10 transition-all"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
