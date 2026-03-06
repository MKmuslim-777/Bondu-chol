import React from "react";

const Friend = () => {
  return (
    <div
      key={index}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 hover:-translate-y-2"
    >
      {/* Background Decoration */}
      <div className="h-24 bg-gradient-to-r from-primary/20 to-blue-500/20 group-hover:from-primary/40 group-hover:to-blue-500/40 transition-colors"></div>

      {/* Profile Image */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <div className="avatar ring-4 ring-white dark:ring-slate-900 rounded-full shadow-xl">
          <div className="w-24 rounded-full bg-slate-200">
            <img src={friend.photoURL} alt={friend.displayName} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 pb-8 px-6 text-center">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white truncate">
          {friend.displayName}
        </h3>
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mt-1 mb-4">
          {friend.role}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 mb-6">
          <FaEnvelope className="text-primary/70" /> {friend.email}
        </p>

        {/* Action Icons */}
        <div className="flex justify-center gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
          <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            <FaFacebook className="text-lg" />
          </button>
          <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-black dark:hover:bg-slate-700 transition-all shadow-sm">
            <FaGithub className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Friend;
