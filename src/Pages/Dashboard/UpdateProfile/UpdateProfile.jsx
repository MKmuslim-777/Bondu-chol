import React from "react";
import {
  FaUser,
  FaCamera,
  FaLink,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLanguage,
  FaSave,
  FaUserEdit,
  FaImage,
  FaCloudUploadAlt,
} from "react-icons/fa";

const UpdateProfile = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
            Update <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Keep your professional and personal data up to date.
          </p>
        </div>
        <button className="btn btn-primary btn-wide rounded-2xl shadow-lg shadow-primary/30 normal-case gap-2">
          <FaSave className="text-lg" /> Save Changes
        </button>
      </div>

      {/* --- NEW: Cover Photo Update Section --- */}
      <div className="mb-10 group">
        <label className="label font-black text-xs uppercase tracking-widest text-slate-500 mb-2">
          Profile Cover Image
        </label>
        <div className="relative h-56 w-full rounded-[2.5rem] overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center transition-all hover:border-primary group">
          {/* Overlay for hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 cursor-pointer">
            <div className="flex flex-col items-center text-white">
              <FaCloudUploadAlt className="text-4xl mb-2" />
              <span className="font-bold">Change Cover Photo</span>
            </div>
          </div>

          {/* Default/Current Cover Preview */}
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
            alt="cover preview"
          />

          <div className="relative z-0 flex flex-col items-center pointer-events-none">
            <FaImage className="text-4xl text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-500">
              Click or drag image to upload cover
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Photo & Social Links */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center">
            <div className="relative inline-block">
              <div className="avatar ring-4 ring-primary ring-offset-4 dark:ring-offset-slate-900 rounded-full">
                <div className="w-32 rounded-full">
                  <img src="https://ui-avatars.com/api/?name=User" alt="User" />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-primary text-white p-3 rounded-full shadow-xl hover:scale-110 transition-transform border-4 border-white dark:border-slate-900">
                <FaCamera />
              </button>
            </div>
            <h3 className="mt-4 font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm">
              Profile Picture
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <FaLink className="text-primary" /> Social Links
            </h3>
            <div className="space-y-4">
              <SocialInput
                label="Facebook"
                placeholder="https://facebook.com/..."
              />
              <SocialInput
                label="GitHub"
                placeholder="https://github.com/..."
              />
              <SocialInput
                label="LinkedIn"
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>
        </div>

        {/* Right Side: Main Form Fields */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <FaUserEdit className="text-primary text-lg" /> Core Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                placeholder="Enter Full Name"
                icon={<FaUser />}
              />
              <InputField
                label="Nickname"
                placeholder="e.g. MK"
                icon={<FaUser />}
              />
              <InputField
                label="Profession"
                placeholder="Frontend Developer"
                icon={<FaUserEdit />}
              />
              <InputField
                label="Date of Birth"
                placeholder="DD-MM-YYYY"
                icon={<FaCalendarAlt />}
              />

              <div className="md:col-span-2">
                <label className="label font-black text-xs uppercase tracking-widest text-slate-500">
                  Bio / About You
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-primary transition-all text-slate-700 dark:text-slate-200"
                  placeholder="Tell the world about yourself..."
                />
              </div>

              <InputField
                label="Hometown"
                placeholder="Chittagong, BD"
                icon={<FaMapMarkerAlt />}
              />
              <InputField
                label="Present Address"
                placeholder="Street, City, Country"
                icon={<FaMapMarkerAlt />}
              />

              <div className="form-control w-full">
                <label className="label font-black text-xs uppercase tracking-widest text-slate-500">
                  Marital Status
                </label>
                <select className="select select-bordered w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-primary font-bold">
                  <option>Single</option>
                  <option>Married</option>
                  <option>In a Relationship</option>
                  <option>Complicated</option>
                </select>
              </div>

              <InputField
                label="Know Languages"
                placeholder="Bangla, English, etc."
                icon={<FaLanguage />}
              />
            </div>

            <div className="mt-12 flex justify-end">
              <button className="btn btn-primary btn-wide rounded-2xl shadow-xl normal-case text-lg font-black">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const InputField = ({ label, placeholder, icon }) => (
  <div className="form-control w-full">
    <label className="label font-black text-xs uppercase tracking-widest text-slate-500">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
        {icon}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-primary transition-all font-bold text-slate-700 dark:text-slate-200"
      />
    </div>
  </div>
);

const SocialInput = ({ label, placeholder }) => (
  <div className="form-control w-full">
    <label className="label font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="input input-sm h-11 w-full rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-primary transition-all text-xs font-bold"
    />
  </div>
);

export default UpdateProfile;
