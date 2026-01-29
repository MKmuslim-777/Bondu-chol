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
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-base-200 lg:bg-transparent"
              : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/event"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-base-200 lg:bg-transparent"
              : "hover:text-primary"
          }
        >
          Event
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/All-friends"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-base-200 lg:bg-transparent"
              : "hover:text-primary"
          }
        >
          All Friends
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tour"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-base-200 lg:bg-transparent"
              : "hover:text-primary"
          }
        >
          Tour
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold bg-base-200 lg:bg-transparent"
              : "hover:text-primary"
          }
        >
          Gallery
        </NavLink>
      </li>
    </>
  );

  return (
    /* ১. drawer-end সরিয়ে দেওয়া হয়েছে যাতে এটি বাম পাশ থেকে আসে */
    <div className="drawer z-[100]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0">
          <div className="navbar container mx-auto px-4 md:px-8">
            <div className="navbar-start gap-2">
              {/* ২. মোবাইল মেনু টগল বাটন এখন সবার বামে */}
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost lg:hidden p-1"
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>

              <Link
                to="/"
                className="flex items-center gap-2 transform transition-transform hover:scale-105"
              >
                <Logo />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                {navLinks}
              </ul>
            </div>

            {/* Right Section */}
            <div className="navbar-end gap-2">
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar online"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                    className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200"
                  >
                    <div className="flex flex-col items-center p-4 border-b border-base-100 mb-2">
                      <span className="font-bold text-lg">
                        {user?.displayName}
                      </span>
                      <span className="text-xs text-base-content/60 truncate w-full text-center">
                        {user?.email}
                      </span>
                    </div>
                    <li>
                      <Link to="/dashboard" className="py-3">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="py-3 text-error font-bold"
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
                    className="btn btn-ghost btn-sm hidden sm:inline-flex"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="btn btn-primary btn-sm px-6"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Side (Mobile Sidebar) */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-100 text-base-content pt-6">
          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-8 px-2">
            <Logo />
            <label
              htmlFor="my-drawer"
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </label>
          </div>

          {/* User Info inside Drawer if logged in */}
          {user && (
            <div className="bg-base-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${user?.displayName}`
                  }
                  alt=""
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-xs opacity-60 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs font-semibold text-base-content/40 px-4 mb-2 uppercase tracking-widest">
            Menu
          </div>
          {navLinks}

          {user && (
            <>
              <div className="divider opacity-50"></div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-error font-medium"
                >
                  Sign Out
                </button>
              </li>
            </>
          )}

          {!user && (
            <div className="mt-auto pb-6 grid grid-cols-1 gap-3 px-2">
              <Link
                to="/auth/login"
                className="btn btn-outline btn-primary btn-sm w-full"
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-primary btn-sm w-full"
              >
                Get Started
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
