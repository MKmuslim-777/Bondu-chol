"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import ImageUploader from "@/components/shared/ImageUploader";
import { FaImages, FaTrash, FaEdit, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { showConfirm } from "@/components/shared/ConfirmToast";

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400";

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
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 block mb-1">স্থান</label>
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

export default function AdminMemoriesPage() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);

  const { isLoading, data: memories = [] } = useQuery({
    queryKey: ["admin-memories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/memories");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { mutate: addMemory, isPending: adding } = useMutation({
    mutationFn: (data) => axiosSecure.post("/memories", data),
    onSuccess: () => { toast.success("স্মৃতি যোগ হয়েছে! 🎉", { description: "নতুন স্মৃতি সফলভাবে সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); setModal(null); },
    onError: () => toast.error("যোগ করতে ব্যর্থ হয়েছে"),
  });

  const { mutate: editMemory, isPending: editing } = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/memories/${id}`, data),
    onSuccess: () => { toast.success("স্মৃতি আপডেট হয়েছে ✓", { description: "পরিবর্তনগুলো সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); setModal(null); },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });

  const { mutate: deleteMemory } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/memories/${id}`),
    onSuccess: () => { toast.success("স্মৃতি মুছে ফেলা হয়েছে", { description: "স্মৃতিটি স্থায়ীভাবে মুছে গেছে" }); queryClient.invalidateQueries({ queryKey: ["admin-memories"] }); },
    onError: () => toast.error("মুছতে ব্যর্থ হয়েছে"),
  });

  const handleSave = (data) => {
    if (modal?.mode === "edit") editMemory({ id: modal.data._id, data });
    else addMemory(data);
  };

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <FaImages className="text-yellow-500" /> স্মৃতি ম্যানেজমেন্ট
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">স্মৃতি যোগ, সম্পাদনা ও মুছুন</p>
          </div>
          <button onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all">
            <FaPlus /> নতুন স্মৃতি
          </button>
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
                    <button onClick={() => showConfirm({
                      title: `"${m.title || "এই স্মৃতি"}" মুছে ফেলবেন?`,
                      description: "স্মৃতিটি স্থায়ীভাবে মুছে যাবে।",
                      confirmLabel: "হ্যাঁ, মুছে দাও",
                      variant: "danger",
                      onConfirm: () => deleteMemory(m._id),
                    })} className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><FaTrash className="text-sm" /></button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-bold text-gray-800 dark:text-white text-sm truncate">{m.title || "শিরোনাম নেই"}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.location || "—"}</p>
                </div>
              </div>
            ))}
            {memories.length === 0 && <div className="col-span-full text-center py-16 text-gray-400">কোনো স্মৃতি নেই</div>}
          </div>
        )}
      </div>
      {modal && <MemoryModal initial={modal.data} onClose={() => setModal(null)} onSave={handleSave} loading={adding || editing} />}
    </RoleGuard>
  );
}
