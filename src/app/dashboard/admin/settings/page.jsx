"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import ImageUploader from "@/components/shared/ImageUploader";
import { showConfirm } from "@/components/shared/ConfirmToast";
import {
  FaCog, FaImage, FaImages, FaPlus, FaEdit, FaTrash,
  FaTimes, FaCheck, FaMapMarkerAlt, FaComments,
} from "react-icons/fa";
import { toast } from "sonner";
import RefreshButton from "@/components/shared/RefreshButton";

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400 transition-all";

// ─── Gallery Modal ───────────────────────────────────────────
function GalleryModal({ initial, onClose, onSave, loading }) {
  const [url, setUrl] = useState(initial?.url || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [caption, setCaption] = useState(initial?.caption || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) { toast.error("ছবি আপলোড করুন"); return; }
    onSave({ url, category, caption });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-black text-gray-800 dark:text-white">{initial ? "গ্যালারি সম্পাদনা" : "নতুন ছবি যোগ"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <ImageUploader value={url} onChange={setUrl} label="গ্যালারি ছবি" aspect="square" />
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1">ক্যাটাগরি</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls} placeholder="যেমন: Travel, Event, Nature" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1">ক্যাপশন</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} className={inputCls} placeholder="ছবির বিবরণ" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">বাতিল</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              <FaCheck /> {initial ? "আপডেট" : "যোগ করো"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Memory Modal ────────────────────────────────────────────
function MemoryModal({ initial, onClose, onSave, loading }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [url, setUrl] = useState(initial?.url || "");
  const [location, setLocation] = useState(initial?.location || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    if (!url) { toast.error("ছবি আপলোড করুন"); return; }
    onSave({ title, url, location });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-black text-gray-800 dark:text-white">{initial ? "স্মৃতি সম্পাদনা" : "নতুন স্মৃতি যোগ"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <ImageUploader value={url} onChange={setUrl} label="স্মৃতির ছবি" aspect="video" />
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1">শিরোনাম *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} placeholder="স্মৃতির শিরোনাম" />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1 flex items-center gap-1">
              <FaMapMarkerAlt className="text-yellow-500" /> স্থান
            </label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="যেমন: সাজেক, রাঙামাটি" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">বাতিল</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              <FaCheck /> {initial ? "আপডেট" : "যোগ করো"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Gallery Tab ─────────────────────────────────────────────
function GalleryTab() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);

  const { isLoading, data: items = [] } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => { const r = await axiosSecure.get("/gallery"); return Array.isArray(r.data) ? r.data : []; },
  });

  const { mutate: addItem, isPending: adding } = useMutation({
    mutationFn: (d) => axiosSecure.post("/gallery", d),
    onSuccess: () => { toast.success("ছবি যোগ হয়েছে! 🎉", { description: "গ্যালারিতে নতুন ছবি সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); setModal(null); },
    onError: () => toast.error("যোগ করতে ব্যর্থ হয়েছে"),
  });
  const { mutate: editItem, isPending: editing } = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/gallery/${id}`, data),
    onSuccess: () => { toast.success("গ্যালারি আপডেট হয়েছে ✓"); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); setModal(null); },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });
  const { mutate: deleteItem } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/gallery/${id}`),
    onSuccess: () => { toast.success("ছবি মুছে ফেলা হয়েছে"); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); },
    onError: () => toast.error("মুছতে ব্যর্থ হয়েছে"),
  });

  const handleSave = (d) => modal?.mode === "edit" ? editItem({ id: modal.data._id, data: d }) : addItem(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total {items.length} photos</p>
        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={() => queryClient.invalidateQueries({ queryKey: ["admin-gallery"] })} />
          <button onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all">
            <FaPlus /> Add Photo
          </button>
        </div>
      </div>
      {isLoading ? <Loading /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {items.map((item) => (
            <div key={item._id} className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              {item.category && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">{item.category}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => setModal({ mode: "edit", data: item })} className="p-2 bg-white rounded-xl text-gray-700 hover:bg-yellow-400 transition-all shadow-lg"><FaEdit className="text-sm" /></button>
                <button onClick={() => showConfirm({ title: "ছবিটি মুছে ফেলবেন?", description: "গ্যালারি থেকে স্থায়ীভাবে মুছে যাবে।", confirmLabel: "হ্যাঁ, মুছে দাও", variant: "danger", onConfirm: () => deleteItem(item._id) })} className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><FaTrash className="text-sm" /></button>
              </div>
              {item.caption && <div className="p-2"><p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.caption}</p></div>}
            </div>
          ))}
          {items.length === 0 && <div className="col-span-full text-center py-16 text-gray-400">কোনো ছবি নেই</div>}
        </div>
      )}
      {modal && <GalleryModal initial={modal.data} onClose={() => setModal(null)} onSave={handleSave} loading={adding || editing} />}
    </div>
  );
}

// ─── Memories Tab ────────────────────────────────────────────
function MemoriesTab() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);

  const { isLoading, data: memories = [] } = useQuery({
    queryKey: ["admin-memories"],
    queryFn: async () => { const r = await axiosSecure.get("/memories"); return Array.isArray(r.data) ? r.data : []; },
  });

  const { mutate: addMemory, isPending: adding } = useMutation({
    mutationFn: (d) => axiosSecure.post("/memories", d),
    onSuccess: () => { toast.success("স্মৃতি যোগ হয়েছে! 🎉", { description: "নতুন স্মৃতি সফলভাবে সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); setModal(null); },
    onError: () => toast.error("যোগ করতে ব্যর্থ হয়েছে"),
  });
  const { mutate: editMemory, isPending: editing } = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/memories/${id}`, data),
    onSuccess: () => { toast.success("স্মৃতি আপডেট হয়েছে ✓"); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); setModal(null); },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });
  const { mutate: deleteMemory } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/memories/${id}`),
    onSuccess: () => { toast.success("স্মৃতি মুছে ফেলা হয়েছে"); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); },
    onError: () => toast.error("মুছতে ব্যর্থ হয়েছে"),
  });

  const handleSave = (d) => modal?.mode === "edit" ? editMemory({ id: modal.data._id, data: d }) : addMemory(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">Total {memories.length} memories</p>
        <div className="flex items-center gap-2">
          <RefreshButton onRefresh={() => queryClient.invalidateQueries({ queryKey: ["admin-memories"] })} />
          <button onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all">
            <FaPlus /> Add Memory
          </button>
        </div>
      </div>
      {isLoading ? <Loading /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {memories.map((m) => (
            <div key={m._id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => setModal({ mode: "edit", data: m })} className="p-2 bg-white rounded-xl text-gray-700 hover:bg-yellow-400 transition-all shadow-lg"><FaEdit className="text-sm" /></button>
                  <button onClick={() => showConfirm({ title: `"${m.title || "এই স্মৃতি"}" মুছে ফেলবেন?`, description: "স্মৃতিটি স্থায়ীভাবে মুছে যাবে।", confirmLabel: "হ্যাঁ, মুছে দাও", variant: "danger", onConfirm: () => deleteMemory(m._id) })} className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><FaTrash className="text-sm" /></button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{m.title || "শিরোনাম নেই"}</p>
                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                  {m.location && <><FaMapMarkerAlt className="text-yellow-500" />{m.location}</>}
                </p>
              </div>
            </div>
          ))}
          {memories.length === 0 && <div className="col-span-full text-center py-16 text-gray-400">কোনো স্মৃতি নেই</div>}
        </div>
      )}
      {modal && <MemoryModal initial={modal.data} onClose={() => setModal(null)} onSave={handleSave} loading={adding || editing} />}
    </div>
  );
}

// ─── Chat Room Tab ───────────────────────────────────────────
function ChatRoomTab() {
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load current settings
  useQuery({
    queryKey: ["chat-settings"],
    queryFn: async () => {
      const r = await axiosSecure.get("/chat-settings");
      setName(r.data.name || "Bara Chat Room");
      setBgImage(r.data.bgImage || "");
      setBgColor(r.data.bgColor || "");
      setLoaded(true);
      return r.data;
    },
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosSecure.patch("/chat-settings", { name, bgImage, bgColor });
      // Broadcast via socket so all online members see it instantly
      if (typeof window !== "undefined") {
        const { io } = await import("socket.io-client");
        const s = io({ path: "/api/socket", transports: ["websocket", "polling"] });
        s.once("connect", () => {
          s.emit("update_chat_settings", { name, bgImage, bgColor });
          setTimeout(() => s.disconnect(), 1000);
        });
      }
      toast.success("Chat room আপডেট হয়েছে ✓", { description: "সকল সদস্যরা নতুন সেটিংস দেখতে পাবে" });
    } catch {
      toast.error("আপডেট ব্যর্থ হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return <Loading />;

  return (
    <form onSubmit={handleSave} className="max-w-xl space-y-6">
      {/* Live preview */}
      <div
        className="w-full h-40 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden relative flex items-center justify-center"
        style={{
          backgroundColor: bgColor || undefined,
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!bgImage && !bgColor && (
          <span className="text-gray-400 text-sm">Preview</span>
        )}
        {(bgImage || bgColor) && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white font-black text-lg drop-shadow">{name || "Chat Room"}</span>
          </div>
        )}
        {!bgImage && !bgColor && (
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">ব্যাকগ্রাউন্ড সেট করুন</span>
        )}
      </div>

      {/* Room name */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">Chat Room নাম</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Bara Chat Room"
          maxLength={50}
        />
      </div>

      {/* BG Image */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">ব্যাকগ্রাউন্ড ছবি</label>
        <ImageUploader value={bgImage} onChange={setBgImage} label="" aspect="cover" />
        {bgImage && (
          <button type="button" onClick={() => setBgImage("")} className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1">
            <FaTimes className="text-[10px]" /> ছবি সরিয়ে দাও
          </button>
        )}
      </div>

      {/* BG Color (fallback if no image) */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1.5">
          ব্যাকগ্রাউন্ড রঙ <span className="normal-case font-normal">(ছবি না থাকলে ব্যবহার হবে)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={bgColor || "#0f1117"}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-12 h-10 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer bg-transparent"
          />
          <input
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className={`${inputCls} flex-1`}
            placeholder="#0f1117 বা যেকোনো CSS color"
          />
          {bgColor && (
            <button type="button" onClick={() => setBgColor("")} className="p-2 text-gray-400 hover:text-red-500 transition-all">
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all disabled:opacity-60"
      >
        <FaCheck /> {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করো"}
      </button>
    </form>
  );
}

// ─── Main Page ───────────────────────────────────────────────
const TABS = [
  { key: "gallery",  label: "গ্যালারি",   icon: FaImage    },
  { key: "memories", label: "স্মৃতিমালা", icon: FaImages   },
  { key: "chat",     label: "Chat Room",  icon: FaComments },
];

export default function AdminSettingsPage() {
  const [tab, setTab] = useState("gallery");

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
            <FaCog className="text-yellow-500" /> সাইট সেটিংস
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">গ্যালারি ও স্মৃতিমালা পরিচালনা করুন</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-0">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all border-b-2 -mb-px ${
                  active
                    ? "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                <Icon className={active ? "text-yellow-500" : ""} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === "gallery"  && <GalleryTab />}
        {tab === "memories" && <MemoriesTab />}
        {tab === "chat"     && <ChatRoomTab />}
      </div>
    </RoleGuard>
  );
}
