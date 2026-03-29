"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import { useRole } from "@/hooks/useRole";
import Loading from "@/components/shared/Loading";
import {
  FaEdit, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGithub,
  FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaYoutube,
  FaPhoneAlt, FaHome, FaHeart, FaTransgender, FaUserTag,
  FaBriefcase, FaGraduationCap, FaLanguage, FaCode, FaGlobe,
  FaQuoteLeft, FaTelegram,
} from "react-icons/fa";
import { MdVerified, MdCake, MdBloodtype } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const roleBadge = {
  admin:     { label: "Admin",     cls: "bg-red-500/10 text-red-500 border-red-500/20" },
  moderator: { label: "Moderator", cls: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  bara:      { label: "Bara ⭐",   cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  user:      { label: "Member",    cls: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700" },
};

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="text-gray-500 dark:text-gray-400 text-sm" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-words">{value}</p>
      </div>
    </div>
  );
}

function SocialBtn({ href, icon: Icon, color }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`p-2.5 rounded-xl border transition-all hover:-translate-y-0.5 hover:shadow-md ${color}`}>
      <Icon className="text-base" />
    </a>
  );
}

function TagList({ items, color = "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" }) {
  if (!items?.length) return <p className="text-sm text-gray-400 italic">উল্লেখ করা হয়নি</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <span key={i} className={`px-3 py-1 rounded-xl text-xs font-bold ${color}`}>{t}</span>
      ))}
    </div>
  );
}

export default function MyProfilePage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["my-profile"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data || {};
    },
  });

  if (isLoading) return <Loading />;

  const rc = roleBadge[role] || roleBadge.user;

  const socials = [
    { href: profile.facebook,  icon: FaFacebook,  color: "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20" },
    { href: profile.github,    icon: FaGithub,    color: "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800" },
    { href: profile.linkedin,  icon: FaLinkedin,  color: "border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20" },
    { href: profile.twitter,   icon: FaTwitter,   color: "border-sky-200 text-sky-500 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-400 dark:hover:bg-sky-900/20" },
    { href: profile.instagram, icon: FaInstagram, color: "border-pink-200 text-pink-500 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-900/20" },
    { href: profile.youtube,   icon: FaYoutube,   color: "border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20" },
    { href: profile.telegram,  icon: FaTelegram,  color: "border-cyan-200 text-cyan-500 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900/20" },
    { href: profile.website,   icon: FaGlobe,     color: "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20" },
  ];

  const hasSocial = socials.some((s) => s.href);

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Cover + Avatar + Name */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
        {/* Cover */}
        <div className="h-44 md:h-56 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-950">
          {profile.coverURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.coverURL} alt="cover" className="w-full h-full object-cover opacity-70" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(234,179,8,0.2),transparent_60%)]" />
          )}
          <Link
            href="/dashboard/updateProfile"
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-xl border border-white/20 transition-all"
          >
            <FaEdit /> প্রোফাইল সম্পাদনা
          </Link>
        </div>

        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
            <div className="relative flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photoURL || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&size=128&background=random`}
                alt="avatar"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl object-cover"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-black text-gray-900 dark:text-white">{user?.displayName}</h1>
                <MdVerified className="text-yellow-500 text-lg" />
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${rc.cls}`}>{rc.label}</span>
              </div>
              {profile.nickname && (
                <p className="text-sm text-gray-500 dark:text-gray-400">@{profile.nickname}</p>
              )}
              {(profile.profession || profile.currentCompany) && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                  {profile.profession}{profile.currentCompany ? ` · ${profile.currentCompany}` : ""}
                </p>
              )}
              {(profile.presentAddress || profile.hometown) && (
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <IoLocationSharp /> {profile.presentAddress || profile.hometown}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-5 flex gap-3">
              <FaQuoteLeft className="text-yellow-400 text-lg flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">{profile.bio}</p>
            </div>
          )}

          {/* Social links */}
          {hasSocial && (
            <div className="flex flex-wrap gap-2 mt-5">
              {socials.map((s, i) => <SocialBtn key={i} {...s} />)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column */}
        <div className="space-y-5">

          {/* Personal info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">ব্যক্তিগত তথ্য</p>
            <InfoRow icon={FaEnvelope}     label="ইমেইল"          value={user?.email} />
            <InfoRow icon={FaPhoneAlt}     label="ফোন"            value={profile.phone} />
            <InfoRow icon={MdCake}         label="জন্মতারিখ"      value={profile.dob} />
            <InfoRow icon={FaTransgender}  label="লিঙ্গ"          value={profile.gender} />
            <InfoRow icon={FaHeart}        label="সম্পর্কের অবস্থা" value={profile.maritalStatus} />
            <InfoRow icon={MdBloodtype}    label="রক্তের গ্রুপ"   value={profile.bloodGroup} />
            <InfoRow icon={FaUserTag}      label="ডাকনাম"         value={profile.nickname} />
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">অবস্থান</p>
            <InfoRow icon={FaHome}         label="গ্রামের বাড়ি"   value={profile.hometown} />
            <InfoRow icon={IoLocationSharp} label="বর্তমান ঠিকানা" value={profile.presentAddress} />
            <InfoRow icon={FaGlobe}        label="দেশ"            value={profile.country} />
          </div>

          {/* Languages */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <FaLanguage /> ভাষা
            </p>
            <TagList items={profile.languages} />
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">

          {/* Professional */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">পেশাদার তথ্য</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              <InfoRow icon={FaBriefcase}    label="পেশা"           value={profile.profession} />
              <InfoRow icon={FaBriefcase}    label="বর্তমান প্রতিষ্ঠান" value={profile.currentCompany} />
              <InfoRow icon={FaGraduationCap} label="শিক্ষাগত যোগ্যতা" value={profile.education} />
              <InfoRow icon={FaGraduationCap} label="বিশ্ববিদ্যালয়/কলেজ" value={profile.institution} />
              <InfoRow icon={FaCalendarAlt}  label="কর্মজীবন শুরু"  value={profile.careerStart} />
              <InfoRow icon={FaGlobe}        label="ওয়েবসাইট"       value={profile.website} />
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <FaCode /> দক্ষতা ও প্রযুক্তি
            </p>
            <TagList
              items={profile.skills}
              color="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50"
            />
          </div>

          {/* Interests */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">শখ ও আগ্রহ</p>
            <TagList
              items={profile.interests}
              color="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50"
            />
          </div>

          {/* Travel */}
          {(profile.visitedPlaces?.length || profile.dreamDestination) && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <FaMapMarkerAlt /> ভ্রমণ
              </p>
              {profile.visitedPlaces?.length > 0 && (
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">ভ্রমণ করা স্থান</p>
                  <TagList
                    items={profile.visitedPlaces}
                    color="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50"
                  />
                </div>
              )}
              {profile.dreamDestination && (
                <InfoRow icon={FaMapMarkerAlt} label="স্বপ্নের গন্তব্য" value={profile.dreamDestination} />
              )}
            </div>
          )}

          {/* Fun facts */}
          {profile.funFact && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">মজার তথ্য</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{profile.funFact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
