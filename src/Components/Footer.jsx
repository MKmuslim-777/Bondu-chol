import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";
import Logo from "../Shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo Section */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-bold uppercase tracking-widest">
            <a className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors cursor-pointer">
              আমাদের গল্প
            </a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors cursor-pointer">
              যোগাযোগ
            </a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors cursor-pointer">
              স্মৃতিমালা
            </a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors cursor-pointer">
              গোপনীয়তা নীতি
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-5">
            {[
              { icon: <FaFacebookF />, color: "hover:bg-blue-600" },
              { icon: <FaTwitter />, color: "hover:bg-sky-500" },
              {
                icon: <FaInstagram />,
                color:
                  "hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500",
              },
              { icon: <FaYoutube />, color: "hover:bg-red-600" },
            ].map((social, index) => (
              <a
                key={index}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300 shadow-sm ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Bottom Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>

          {/* Copyright Section */}
          <div className="text-center space-y-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
              Copyright © {new Date().getFullYear()} — Made with
              <FaHeart className="text-red-500 animate-pulse" />
              by{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                BondhuChol Team
              </span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-[0.3em]">
              স্মৃতিরা বেঁচে থাকুক আমাদের অন্তরে
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
