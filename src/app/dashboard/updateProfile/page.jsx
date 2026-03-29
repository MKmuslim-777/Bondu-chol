"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt,
  FaGithub, FaLinkedin, FaFacebook, FaTwitter, FaInstagram,
  FaYoutube, FaTelegram, FaGlobe, FaBriefcase, FaGraduationCap,
  FaCode, FaHeart, FaLanguage, FaSave, FaCamera,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import ImageUploader from "@/components/shared/ImageUploader";

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5">
        {Icon && <Icon className="text-gray-400" />} {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all placeholder:text-gray-400";
const selectCls = inputCls + " cursor-pointer";

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{title}</p>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function TagInput({ label, icon, value, onChange, placeholder }) {
  const tags = value ? value.split(",").map((t) => t.trim()).filter(Boolean) : [];
  return (
    <div className="sm:col-span-2">
      <Field label={label} icon={icon}>
        <input
          type="text"
          className={inputCls}
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-[10px] text-gray-400 mt-1">কমা (,) দিয়ে আলাদা করুন</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((t, i) => (
              <span key={i} className="px-2.5 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50 rounded-lg text-xs font-bold">{t}</span>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

export default function UpdateProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["my-profile"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data || {};
    },
  });

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isDirty } } = useForm();

  useEffect(() => {
    if (profile && Object.keys(profile).length) {
      reset({
        ...profile,
        photoURL: profile.photoURL || user?.photoURL || "",
        skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills || "",
        languages: Array.isArray(profile.languages) ? profile.languages.join(", ") : profile.languages || "",
        interests: Array.isArray(profile.interests) ? profile.interests.join(", ") : profile.interests || "",
        visitedPlaces: Array.isArray(profile.visitedPlaces) ? profile.visitedPlaces.join(", ") : profile.visitedPlaces || "",
      });
    } else if (user) {
      reset({ photoURL: user.photoURL || "" });
    }
  }, [profile, reset, user]);

  const { mutate: save, isPending } = useMutation({
    mutationFn: async (data) => {
      const toArr = (v) => v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const payload = {
        ...data,
        skills: toArr(data.skills),
        languages: toArr(data.languages),
        interests: toArr(data.interests),
        visitedPlaces: toArr(data.visitedPlaces),
      };
      // Update Firebase display name & photo if changed
      if (user && (data.displayName !== user.displayName || data.photoURL !== user.photoURL)) {
        await updateUserProfile({
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL,
        });
      }
      return axiosSecure.patch("/users/profile", payload);
    },
    onSuccess: () => {
      toast.success("প্রোফাইল আপডেট হয়েছে");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-800 dark:text-white">প্রোফাইল সম্পাদনা</h1>
          <p className="text-sm text-gray-400 mt-0.5">তোমার সকল তথ্য আপডেট করো</p>
        </div>
        <button
          onClick={handleSubmit((d) => save(d))}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all"
        >
          <FaSave /> {isPending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করো"}
        </button>
      </div>

      <form onSubmit={handleSubmit((d) => save(d))} className="space-y-5">

        {/* Profile photo */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <p className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">প্রোফাইল ছবি</p>
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={watch("photoURL") || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=random`}
                alt="avatar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-yellow-400/50"
              />
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-yellow-500 rounded-lg shadow-md">
                <FaCamera className="text-black text-xs" />
              </div>
            </div>
            <div className="flex-1">
              <ImageUploader
                value={watch("photoURL") || ""}
                onChange={(url) => setValue("photoURL", url, { shouldDirty: true })}
                label="নতুন প্রোফাইল ছবি আপলোড করুন"
                aspect="square"
              />
            </div>
          </div>
        </div>

        {/* Cover image upload */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5">
          <ImageUploader
            value={watch("coverURL")}
            onChange={(url) => setValue("coverURL", url, { shouldDirty: true })}
            label="কভার ছবি"
            aspect="cover"
          />
        </div>

        {/* Basic info */}
        <Section title="মৌলিক তথ্য">
          <Field label="পূর্ণ নাম" icon={FaUser} error={errors.displayName?.message}>
            <input {...register("displayName")} defaultValue={user?.displayName} className={inputCls} placeholder="তোমার পূর্ণ নাম" />
          </Field>
          <Field label="ডাকনাম" icon={FaUser}>
            <input {...register("nickname")} className={inputCls} placeholder="যেমন: Kaisan, Rocky" />
          </Field>
          <Field label="ইমেইল" icon={FaEnvelope}>
            <input value={user?.email || ""} disabled className={inputCls + " opacity-60 cursor-not-allowed"} />
          </Field>
          <Field label="ফোন নম্বর" icon={FaPhoneAlt}>
            <input {...register("phone")} className={inputCls} placeholder="+880 1700-000000" />
          </Field>
          <Field label="জন্মতারিখ" icon={FaCalendarAlt}>
            <input {...register("dob")} className={inputCls} placeholder="DD Month, YYYY" />
          </Field>
          <Field label="লিঙ্গ">
            <select {...register("gender")} className={selectCls}>
              <option value="">নির্বাচন করুন</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </Field>
          <Field label="সম্পর্কের অবস্থা" icon={FaHeart}>
            <select {...register("maritalStatus")} className={selectCls}>
              <option value="">নির্বাচন করুন</option>
              <option>Single</option>
              <option>In a Relationship</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Complicated</option>
            </select>
          </Field>
          <Field label="রক্তের গ্রুপ" icon={MdBloodtype}>
            <select {...register("bloodGroup")} className={selectCls}>
              <option value="">নির্বাচন করুন</option>
              {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="বায়ো / পরিচিতি">
              <textarea {...register("bio")} rows={3} className={inputCls + " resize-none"} placeholder="নিজের সম্পর্কে কিছু লিখো..." />
            </Field>
          </div>
        </Section>

        {/* Location */}
        <Section title="অবস্থান">
          <Field label="গ্রামের বাড়ি" icon={FaMapMarkerAlt}>
            <input {...register("hometown")} className={inputCls} placeholder="যেমন: চট্টগ্রাম, বাংলাদেশ" />
          </Field>
          <Field label="বর্তমান ঠিকানা" icon={FaMapMarkerAlt}>
            <input {...register("presentAddress")} className={inputCls} placeholder="যেমন: সিলেট, বাংলাদেশ" />
          </Field>
          <Field label="দেশ" icon={FaGlobe}>
            <input {...register("country")} className={inputCls} placeholder="Bangladesh" />
          </Field>
        </Section>

        {/* Professional */}
        <Section title="পেশাদার তথ্য">
          <Field label="পেশা" icon={FaBriefcase}>
            <input {...register("profession")} className={inputCls} placeholder="যেমন: Full Stack Developer" />
          </Field>
          <Field label="বর্তমান প্রতিষ্ঠান" icon={FaBriefcase}>
            <input {...register("currentCompany")} className={inputCls} placeholder="কোম্পানি / প্রতিষ্ঠানের নাম" />
          </Field>
          <Field label="শিক্ষাগত যোগ্যতা" icon={FaGraduationCap}>
            <input {...register("education")} className={inputCls} placeholder="যেমন: BSc in CSE" />
          </Field>
          <Field label="বিশ্ববিদ্যালয় / কলেজ" icon={FaGraduationCap}>
            <input {...register("institution")} className={inputCls} placeholder="প্রতিষ্ঠানের নাম" />
          </Field>
          <Field label="কর্মজীবন শুরু" icon={FaCalendarAlt}>
            <input {...register("careerStart")} className={inputCls} placeholder="যেমন: ২০২০" />
          </Field>
          <Field label="ওয়েবসাইট / পোর্টফোলিও" icon={FaGlobe}>
            <input {...register("website")} className={inputCls} placeholder="https://yoursite.com" />
          </Field>
        </Section>

        {/* Skills, Languages, Interests, Travel */}
        <Section title="দক্ষতা ও আগ্রহ">
          <TagInput
            label="দক্ষতা ও প্রযুক্তি"
            icon={FaCode}
            value={watch("skills")}
            onChange={(v) => setValue("skills", v, { shouldDirty: true })}
            placeholder="React, Node.js, Python, Figma"
          />
          <TagInput
            label="ভাষা"
            icon={FaLanguage}
            value={watch("languages")}
            onChange={(v) => setValue("languages", v, { shouldDirty: true })}
            placeholder="বাংলা, English, Arabic"
          />
          <TagInput
            label="শখ ও আগ্রহ"
            icon={FaHeart}
            value={watch("interests")}
            onChange={(v) => setValue("interests", v, { shouldDirty: true })}
            placeholder="Photography, Hiking, Cooking"
          />
          <TagInput
            label="ভ্রমণ করা স্থান"
            icon={FaMapMarkerAlt}
            value={watch("visitedPlaces")}
            onChange={(v) => setValue("visitedPlaces", v, { shouldDirty: true })}
            placeholder="সাজেক, কক্সবাজার, সুন্দরবন"
          />
          <div className="sm:col-span-2">
            <Field label="স্বপ্নের গন্তব্য" icon={FaMapMarkerAlt}>
              <input {...register("dreamDestination")} className={inputCls} placeholder="যেমন: Maldives, Switzerland" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="মজার তথ্য (Fun Fact)">
              <textarea {...register("funFact")} rows={2} className={inputCls + " resize-none"} placeholder="নিজের সম্পর্কে একটি মজার তথ্য..." />
            </Field>
          </div>
        </Section>

        {/* Social links */}
        <Section title="সোশ্যাল লিংক">
          <Field label="Facebook" icon={FaFacebook}>
            <input {...register("facebook")} className={inputCls} placeholder="https://facebook.com/..." />
          </Field>
          <Field label="GitHub" icon={FaGithub}>
            <input {...register("github")} className={inputCls} placeholder="https://github.com/..." />
          </Field>
          <Field label="LinkedIn" icon={FaLinkedin}>
            <input {...register("linkedin")} className={inputCls} placeholder="https://linkedin.com/in/..." />
          </Field>
          <Field label="Twitter / X" icon={FaTwitter}>
            <input {...register("twitter")} className={inputCls} placeholder="https://twitter.com/..." />
          </Field>
          <Field label="Instagram" icon={FaInstagram}>
            <input {...register("instagram")} className={inputCls} placeholder="https://instagram.com/..." />
          </Field>
          <Field label="YouTube" icon={FaYoutube}>
            <input {...register("youtube")} className={inputCls} placeholder="https://youtube.com/..." />
          </Field>
          <Field label="Telegram" icon={FaTelegram}>
            <input {...register("telegram")} className={inputCls} placeholder="https://t.me/..." />
          </Field>
        </Section>

        {/* Save button bottom */}
        <div className="flex justify-end pb-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-black font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all"
          >
            <FaSave /> {isPending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করো"}
          </button>
        </div>
      </form>
    </div>
  );
}
