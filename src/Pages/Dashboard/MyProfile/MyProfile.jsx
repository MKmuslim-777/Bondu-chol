import React from "react";
import {
  FaEdit,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaLanguage,
  FaUserTag,
  FaHeart,
  FaTransgender,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaCrown,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";

const MyProfile = () => {
  const { user } = useAuth();

  // এক্সট্রা ডিটেইলস (এগুলো ডাটাবেজ থেকে আসবে)
  const profile = {
    nickname: "Kaisan",
    bio: "Creative Developer & UI/UX enthusiast. I build high-performance web applications with a focus on user experience. Always learning, always coding.",
    dob: "24 December, 1998",
    hometown: "Chittagong, Bangladesh",
    presentAddress: "Zindabazar, Sylhet (Current)",
    gender: "Male",
    maritalStatus: "Single",
    profession: "Full Stack Developer",
    languages: ["Bangla", "English", "Arabic"],
    phone: "+880 1700-000000",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 1. Header & Hero Section */}
        <div className="relative mb-8">
          {/* Cover Photo */}
          <div className="h-64 md:h-80 w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070"
              className="w-full h-full object-cover"
              alt="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>

          {/* Profile Identity Floating Card */}
          <div className="absolute -bottom-16 left-8 right-8 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="relative -mt-20 md:-mt-24">
              <div className="avatar ring-[6px] ring-primary rounded-full shadow-2xl">
                <div className="w-32 md:w-40 rounded-full border-4 border-white dark:border-slate-900">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase">
                  {user?.displayName}
                </h1>
                <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1">
                  <FaCrown /> VERIFIED BARA
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                {profile.profession} •{" "}
                <span className="italic">@{profile.nickname}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={"/dashboard/updateProfile"}
                className="btn btn-primary rounded-2xl shadow-lg shadow-primary/30 normal-case px-6"
              >
                <FaEdit /> Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Main Content Grid */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Personal Snapshot) */}
          <div className="space-y-6">
            {/* Bio Card */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                Bio
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {profile.bio}
              </p>
            </div>

            {/* Languages & Skills */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <FaLanguage /> Linguistic Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <span
                    key={l}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs uppercase tracking-wider"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links (Modern Style) */}
            <div className="flex justify-between gap-4">
              {[<FaFacebook />, <FaGithub />, <FaLinkedin />].map((icon, i) => (
                <button
                  key={i}
                  className="flex-1 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex justify-center text-xl text-slate-600 hover:text-primary transition-all"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (The Grand Info Table) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
                  Detailed Intelligence
                </h3>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <ProfileDetailItem
                  icon={<FaUserTag />}
                  label="Known As"
                  value={profile.nickname}
                />
                <ProfileDetailItem
                  icon={<FaCalendarAlt />}
                  label="Birthday"
                  value={profile.dob}
                />
                <ProfileDetailItem
                  icon={<FaTransgender />}
                  label="Gender Identity"
                  value={profile.gender}
                />
                <ProfileDetailItem
                  icon={<FaHeart />}
                  label="Relationship"
                  value={profile.maritalStatus}
                />
                <ProfileDetailItem
                  icon={<FaEnvelope />}
                  label="Primary Mail"
                  value={user?.email}
                />
                <ProfileDetailItem
                  icon={<FaPhoneAlt />}
                  label="Contact Number"
                  value={profile.phone}
                />
                <ProfileDetailItem
                  icon={<FaHome />}
                  label="Hometown"
                  value={profile.hometown}
                />
                <ProfileDetailItem
                  icon={<FaMapMarkerAlt />}
                  label="Live In"
                  value={profile.presentAddress}
                />
              </div>

              {/* Expertise Bar */}
              <div className="px-8 pb-10 pt-6">
                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex flex-wrap items-center gap-4">
                  <span className="text-xs font-black text-primary uppercase tracking-widest mr-4">
                    Expertise:
                  </span>
                  {["React", "Node", "Mongo", "Tailwind", "Python"].map((s) => (
                    <span
                      key={s}
                      className="font-bold text-slate-700 dark:text-slate-300 text-sm"
                    >
                      • {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Advanced Detail Item
const ProfileDetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-5 group">
    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100 dark:border-slate-700">
      {icon}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">
        {label}
      </p>
      <p className="text-base font-bold text-slate-800 dark:text-slate-200 truncate">
        {value || "Not Provided"}
      </p>
    </div>
  </div>
);

export default MyProfile;
