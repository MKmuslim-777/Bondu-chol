import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../Hooks/useTheme"; // আপনার পাথ অনুযায়ী ঠিক করে নিন

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <li className="list-none">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          {theme === "light" ? (
            <>
              <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg">
                <FaMoon className="text-lg text-indigo-600 dark:text-indigo-400 group-hover:rotate-[-15deg] transition-transform" />
              </div>
              <span className="font-medium">Dark Mode</span>
            </>
          ) : (
            <>
              <div className="p-2 bg-amber-50 dark:bg-slate-700 rounded-lg">
                <FaSun className="text-lg text-amber-500 group-hover:rotate-45 transition-transform" />
              </div>
              <span className="font-medium">Light Mode</span>
            </>
          )}
        </div>

        {/* Custom Toggle Switch UI */}
        <div
          className={`w-10 h-5 rounded-full relative transition-colors duration-500 ${theme === "dark" ? "bg-primary" : "bg-slate-300"}`}
        >
          <div
            className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${
              theme === "dark" ? "left-6" : "left-1"
            }`}
          ></div>
        </div>
      </button>
    </li>
  );
};

export default ThemeToggle;
