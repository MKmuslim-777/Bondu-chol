import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

const FriendCard = ({ friend }) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-700 border border-slate-100 dark:border-slate-800 hover:-translate-y-3">
      {/* 1. Animated Header Background */}
      <div className="h-28 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
      </div>

      {/* 2. Floating Avatar Section */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2">
        <div className="avatar ring-[6px] ring-white dark:ring-slate-900 rounded-full shadow-2xl group-hover:ring-primary/20 transition-all duration-500">
          <div className="w-28 rounded-full bg-slate-200 relative overflow-hidden">
            <img
              src={friend.photoURL || "https://ui-avatars.com/api/?name=User"}
              className="group-hover:scale-110 transition-transform duration-700"
              alt={friend.displayName}
            />
          </div>
        </div>
        {/* Status Badge */}
        <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full shadow-lg"></div>
      </div>

      {/* 3. Content Area */}
      <div className="pt-16 pb-10 px-8 text-center">
        {/* Name & Role */}
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter group-hover:text-primary transition-colors">
            {friend.displayName}
          </h3>
          <div className="inline-block mt-1 px-4 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full border border-primary/20">
            {friend.role || "MEMBER"}
          </div>
        </div>

        {/* Info Grid (Glass Style) */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors">
            <div className="p-2 bg-white dark:bg-slate-800 shadow-sm rounded-lg text-primary">
              <FaEnvelope className="text-sm" />
            </div>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate tracking-tight italic">
              {friend.email}
            </p>
          </div>
        </div>

        {/* 4. Interactive Action Dock */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex gap-2">
            <a
              href="#"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-blue-600 hover:bg-blue-600 hover:text-white hover:rotate-12 transition-all shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-black hover:-rotate-12 transition-all shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <FaGithub />
            </a>
          </div>

          <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
            View Info <FaExternalLinkAlt className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-primary group-hover:w-full transition-all duration-700"></div>
    </div>
  );
};

export default FriendCard;
