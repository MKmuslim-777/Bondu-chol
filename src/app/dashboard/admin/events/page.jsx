"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useImageUpload } from "@/hooks/useImageUpload";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import ImageUploader from "@/components/shared/ImageUploader";
import { showConfirm } from "@/components/shared/ConfirmToast";
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaTimes, FaCheck, FaMapMarkerAlt, FaClock, FaUsers, FaImages } from "react-icons/fa";
import { MdEventAvailable, MdEventBusy } from "react-icons/md";
import { toast } from "sonner";
import RefreshButton from "@/components/shared/RefreshButton";

const statusCfg = {
  upcoming: { label: "আসছে",      cls: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  ongoing:  { label: "চলছে",      cls: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  past:     { label: "শেষ হয়েছে", cls: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400" },
};

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-yellow-400 transition-all placeholder:text-gray-400";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function PhotosUploader({ photos, onChange }) {
  const { uploadMultiple, uploading } = useImageUpload();

  const handleFiles = async (files) => {
    if (!files?.length) return;
    const urls = await uploadMultiple(Array.from(files));
    if (urls.length) onChange([...photos, ...urls]);
  };

  const remove = (i) => {
    showConfirm({
      title: "ছবিটি সরিয়ে দেবেন?",
      description: "এই ছবিটি ইভেন্ট থেকে মুছে যাবে।",
      confirmLabel: "হ্যাঁ, সরাও",
      variant: "danger",
      onConfirm: () => onChange(photos.filter((_, idx) => idx !== i)),
    });
  };

  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1.5">
        ইভেন্টের ছবিসমূহ
        {photos.length > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-[9px] font-black">
            {photos.length}টি ছবি
          </span>
        )}
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
        {photos.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-100 dark:border-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <FaTimes className="text-[10px]" />
            </button>
          </div>
        ))}
        <label className={`aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-all ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? (
            <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaPlus className="text-gray-400 text-lg mb-1" />
              <span className="text-[10px] text-gray-400 font-bold text-center px-1">ছবি যোগ</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="text-[10px] text-gray-400">একসাথে একাধিক ছবি সিলেক্ট করা যাবে</p>
    </div>
  );
}

function EventModal({ initial, onClose, onSave, loading }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: initial || {
      title: "", description: "", date: "", endDate: "", time: "",
      location: "", category: "", capacity: "", coverURL: "", status: "upcoming", tags: "",
    },
  });
  const [photos, setPhotos] = useState(initial?.photos || []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <h3 className="font-black text-gray-800 dark:text-white">{initial ? "ইভেন্ট সম্পাদনা" : "নতুন ইভেন্ট"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><FaTimes /></button>
        </div>

        <form onSubmit={handleSubmit((d) => onSave({ ...d, photos }))} className="overflow-y-auto flex-1">
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <ImageUploader value={watch("coverURL")} onChange={(url) => setValue("coverURL", url)} label="কভার ছবি" aspect="cover" />
            </div>
            <div className="sm:col-span-2">
              <Field label="ইভেন্টের শিরোনাম *">
                <input {...register("title", { required: true })} className={inputCls} placeholder="ইভেন্টের নাম লিখুন" />
                {errors.title && <p className="text-red-500 text-xs mt-1">শিরোনাম আবশ্যক</p>}
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="বিবরণ">
                <textarea {...register("description")} rows={3} className={inputCls + " resize-none"} placeholder="ইভেন্ট সম্পর্কে বিস্তারিত..." />
              </Field>
            </div>
            <Field label="শুরুর তারিখ">
              <input {...register("date")} type="date" className={inputCls} />
            </Field>
            <Field label="শেষের তারিখ">
              <input {...register("endDate")} type="date" className={inputCls} />
            </Field>
            <Field label="সময়">
              <input {...register("time")} className={inputCls} placeholder="যেমন: সকাল ১০টা — বিকেল ৫টা" />
            </Field>
            <Field label="স্থান">
              <input {...register("location")} className={inputCls} placeholder="ইভেন্টের স্থান" />
            </Field>
            <Field label="ক্যাটাগরি">
              <select {...register("category")} className={inputCls + " cursor-pointer"}>
                <option value="">নির্বাচন করুন</option>
                <option>ট্যুর</option><option>আড্ডা</option><option>পিকনিক</option>
                <option>অ্যাডভেঞ্চার</option><option>সাংস্কৃতিক</option>
                <option>খেলাধুলা</option><option>অন্যান্য</option>
              </select>
            </Field>
            <Field label="সর্বোচ্চ অংশগ্রহণকারী">
              <input {...register("capacity")} type="number" className={inputCls} placeholder="যেমন: 20" />
            </Field>
            <Field label="স্ট্যাটাস">
              <select {...register("status")} className={inputCls + " cursor-pointer"}>
                <option value="upcoming">আসছে</option>
                <option value="ongoing">চলছে</option>
                <option value="past">শেষ হয়েছে</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="ট্যাগ (কমা দিয়ে আলাদা করুন)">
                <input {...register("tags")} className={inputCls} placeholder="ট্যুর, বন্ধু, আড্ডা" />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <PhotosUploader photos={photos} onChange={setPhotos} />
            </div>
          </div>

          <div className="flex gap-3 p-5 border-t border-gray-100 dark:border-gray-800">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">বাতিল</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              <FaCheck /> {initial ? "আপডেট করো" : "তৈরি করো"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EventRow({ event, onEdit, onDelete }) {
  const sc = statusCfg[event.status] || statusCfg.upcoming;
  const photoCount = event.photos?.length || 0;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
      <div className="w-full sm:w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative">
        {event.coverURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.coverURL} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {event.status === "past" ? <MdEventBusy className="text-2xl text-gray-400" /> : <MdEventAvailable className="text-2xl text-yellow-400" />}
          </div>
        )}
        {photoCount > 0 && (
          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <FaImages className="text-[8px]" />{photoCount}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-black text-gray-800 dark:text-white text-sm truncate">{event.title}</h3>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${sc.cls}`}>{sc.label}</span>
          {event.category && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">{event.category}</span>}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
          {event.date && <span className="flex items-center gap-1"><FaCalendarAlt className="text-yellow-500" />{new Date(event.date).toLocaleDateString("bn-BD")}</span>}
          {event.time && <span className="flex items-center gap-1"><FaClock className="text-yellow-500" />{event.time}</span>}
          {event.location && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-500" />{event.location}</span>}
          {event.capacity && <span className="flex items-center gap-1"><FaUsers className="text-yellow-500" />{event.capacity} জন</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={() => onEdit(event)} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-yellow-600 hover:border-yellow-400 transition-all" title="সম্পাদনা">
          <FaEdit className="text-sm" />
        </button>
        <button
          onClick={() => showConfirm({
            title: `"${event.title}" মুছে ফেলবেন?`,
            description: "এই ইভেন্টটি স্থায়ীভাবে মুছে যাবে। এটি পূর্বাবস্থায় ফেরানো যাবে না।",
            confirmLabel: "হ্যাঁ, মুছে দাও",
            variant: "danger",
            onConfirm: () => onDelete(event._id),
          })}
          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-300 transition-all"
          title="মুছুন"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </div>
  );
}

export default function AdminEventsPage() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);

  const { isLoading, data: events = [] } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const toArr = (v) => typeof v === "string" ? v.split(",").map((s) => s.trim()).filter(Boolean) : (v || []);

  const { mutate: addEvent, isPending: adding } = useMutation({
    mutationFn: (data) => axiosSecure.post("/events", { ...data, tags: toArr(data.tags) }),
    onSuccess: () => { toast.success("ইভেন্ট তৈরি হয়েছে! 🎉", { description: "নতুন ইভেন্ট সফলভাবে যোগ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-events"] }); setModal(null); },
    onError: () => toast.error("ইভেন্ট তৈরি ব্যর্থ", { description: "আবার চেষ্টা করুন" }),
  });

  const { mutate: editEvent, isPending: editing } = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/events/${id}`, { ...data, tags: toArr(data.tags) }),
    onSuccess: () => { toast.success("ইভেন্ট আপডেট হয়েছে ✓", { description: "পরিবর্তনগুলো সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-events"] }); setModal(null); },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });

  const { mutate: deleteEvent } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/events/${id}`),
    onSuccess: () => { toast.success("ইভেন্ট মুছে ফেলা হয়েছে", { description: "ইভেন্টটি স্থায়ীভাবে মুছে গেছে" }); queryClient.invalidateQueries({ queryKey: ["admin-events"] }); },
    onError: () => toast.error("মুছতে ব্যর্থ হয়েছে"),
  });

  const handleSave = (data) => {
    if (modal?.mode === "edit") editEvent({ id: modal.data._id, data });
    else addEvent(data);
  };

  const openEdit = (event) => {
    setModal({ mode: "edit", data: { ...event, tags: Array.isArray(event.tags) ? event.tags.join(", ") : event.tags || "" } });
  };

  const stats = {
    total: events.length,
    upcoming: events.filter((e) => (e.status || "upcoming") === "upcoming").length,
    ongoing: events.filter((e) => e.status === "ongoing").length,
    past: events.filter((e) => e.status === "past").length,
  };

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <FaCalendarAlt className="text-yellow-500" /> ইভেন্ট ম্যানেজমেন্ট
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ইভেন্ট তৈরি, সম্পাদনা ও মুছুন</p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshButton onRefresh={() => queryClient.invalidateQueries({ queryKey: ["admin-events"] })} />
            <button onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all">
              <FaPlus /> New Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "মোট", value: stats.total, cls: "text-gray-800 dark:text-white" },
            { label: "আসছে", value: stats.upcoming, cls: "text-yellow-600 dark:text-yellow-400" },
            { label: "চলছে", value: stats.ongoing, cls: "text-green-600 dark:text-green-400" },
            { label: "শেষ", value: stats.past, cls: "text-gray-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center">
              <p className={`text-2xl font-black ${s.cls}`}>{s.value}</p>
              <p className="text-xs text-gray-400 font-bold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {isLoading ? <Loading /> : (
          <div className="space-y-3">
            {events.map((e) => <EventRow key={e._id} event={e} onEdit={openEdit} onDelete={deleteEvent} />)}
            {events.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <FaCalendarAlt className="text-4xl mx-auto mb-3 opacity-30" />
                <p className="font-bold">কোনো ইভেন্ট নেই</p>
              </div>
            )}
          </div>
        )}
      </div>

      {modal && <EventModal initial={modal.data} onClose={() => setModal(null)} onSave={handleSave} loading={adding || editing} />}
    </RoleGuard>
  );
}
