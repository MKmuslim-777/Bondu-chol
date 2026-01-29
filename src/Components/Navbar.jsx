import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Shared/Logo";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("User signed out"))
      .catch((error) => console.error("Sign Out Error:", error));
  };

  const navLinks = (
    <>
      {["Home", "Event", "All-friends", "Tour", "Gallery"].map((item) => (
        <li key={item}>
          <NavLink
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `relative px-4 py-2 transition-all duration-300 ${
                isActive
                  ? "text-primary font-bold bg-primary/10 lg:bg-transparent lg:after:content-[''] lg:after:absolute lg:after:bottom-0 lg:after:left-4 lg:after:right-4 lg:after:h-1 lg:after:bg-primary lg:after:rounded-full"
                  : "hover:text-primary opacity-70 hover:opacity-100"
              }`
            }
          >
            {item.replace("-", " ")}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div className="drawer z-[100]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <div className="w-full bg-base-100/60 backdrop-blur-xl border-b border-base-200 sticky top-0 transition-all">
          <div className="navbar container mx-auto px-4 md:px-8 h-20">
            <div className="navbar-start gap-3">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost lg:hidden btn-circle hover:bg-primary/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h10M4 18h16"
                  />
                </svg>
              </label>
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <Logo />
              </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal p-0 gap-1 font-semibold text-[15px]">
                {navLinks}
              </ul>
            </div>

            <div className="navbar-end gap-4">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar online ring-2 ring-primary/20 ring-offset-2"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${user?.displayName}`
                        }
                        alt="profile"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-base-100/90 backdrop-blur-md rounded-2xl w-64 border border-base-200"
                  >
                    <div className="flex flex-col items-center p-4 border-b border-base-100 mb-2">
                      <span className="font-bold text-lg">
                        {user?.displayName}
                      </span>
                      <span className="text-xs opacity-50 truncate w-full text-center">
                        {user?.email}
                      </span>
                    </div>
                    <li>
                      <Link to="/dashboard" className="py-3 rounded-xl">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="py-3 text-error font-bold rounded-xl hover:bg-error/10"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    className="hidden sm:flex text-sm font-bold px-4 py-2 hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-bold text-white transition-all duration-300 bg-primary rounded-full hover:bg-primary-focus group shadow-lg shadow-primary/30"
                  >
                    <span className="relative">Join Now</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Side */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="p-6 w-80 min-h-full bg-base-100/95 backdrop-blur-md text-base-content flex flex-col">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <label
              htmlFor="my-drawer"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>

          {/* User Info or Join Card */}
          {user ? (
            <div className="bg-gradient-to-br from-primary/10 to-transparent rounded-3xl p-5 mb-8 border border-primary/10">
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-2xl shadow-lg"
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName}`
                  }
                  alt=""
                />
                <div className="overflow-hidden">
                  <p className="font-black text-base truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-[10px] opacity-50 truncate uppercase tracking-tighter">
                    Member
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black text-white rounded-3xl p-6 mb-8 shadow-2xl overflow-hidden relative group">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2 leading-none">
                  Explore
                  <br />
                  Our Circle.
                </h3>
                <p className="text-[10px] opacity-60 mb-4">
                  গল্পগুলো শেয়ার করো আমাদের সাথে!
                </p>
                <Link
                  to="/auth/register"
                  onClick={() => document.getElementById("my-drawer").click()}
                  className="bg-white text-black text-[11px] font-black px-4 py-2 rounded-full inline-block uppercase tracking-wider"
                >
                  Create Account
                </Link>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl transition-all group-hover:bg-primary/40"></div>
            </div>
          )}

          <div className="text-[10px] font-black text-base-content/30 px-2 mb-4 uppercase tracking-[3px]">
            Navigation
          </div>

          <ul className="menu menu-md p-0 gap-1 flex-1">{navLinks}</ul>

          {/* Social Style Auth at bottom for Guest */}
          {!user && (
            <div className="pt-6 mt-6 border-t border-base-200">
              <Link
                to="/auth/login"
                onClick={() => document.getElementById("my-drawer").click()}
                className="flex items-center justify-center gap-2 w-full py-4 text-sm font-black uppercase tracking-widest border-2 border-base-200 rounded-2xl hover:bg-base-200 transition-all"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          )}

          {user && (
            <div className="pt-6 mt-6 border-t border-base-200 flex flex-col gap-2">
              <Link
                to="/dashboard"
                onClick={() => document.getElementById("my-drawer").click()}
                className="btn btn-ghost justify-start rounded-xl"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-ghost justify-start text-error hover:bg-error/10 rounded-xl"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
