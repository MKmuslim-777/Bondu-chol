"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import ImageUploader from "@/components/shared/ImageUploader";
import { FaImage, FaTrash, FaEdit, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { showConfirm } from "@/components/shared/ConfirmToast";

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-yellow-400";

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

export default function AdminGalleryPage() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(null);

  const { isLoading, data: items = [] } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const res = await axiosSecure.get("/gallery");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const { mutate: addItem, isPending: adding } = useMutation({
    mutationFn: (data) => axiosSecure.post("/gallery", data),
    onSuccess: () => { toast.success("ছবি যোগ হয়েছে! 🎉", { description: "গ্যালারিতে নতুন ছবি সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); setModal(null); },
    onError: () => toast.error("যোগ করতে ব্যর্থ হয়েছে"),
  });

  const { mutate: editItem, isPending: editing } = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/gallery/${id}`, data),
    onSuccess: () => { toast.success("গ্যালারি আপডেট হয়েছে ✓", { description: "পরিবর্তনগুলো সংরক্ষণ করা হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); setModal(null); },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/gallery/${id}`),
    onSuccess: () => { toast.success("ছবি মুছে ফেলা হয়েছে", { description: "ছবিটি গ্যালারি থেকে সরানো হয়েছে" }); queryClient.invalidateQueries({ queryKey: ["admin-gallery"] }); },
    onError: () => toast.error("মুছতে ব্যর্থ হয়েছে"),
  });

  const handleSave = (data) => {
    if (modal?.mode === "edit") editItem({ id: modal.data._id, data });
    else addItem(data);
  };

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <FaImage className="text-yellow-500" /> গ্যালারি ম্যানেজমেন্ট
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">গ্যালারি ছবি যোগ, সম্পাদনা ও মুছুন</p>
          </div>
          <button onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-black rounded-xl shadow-md shadow-yellow-500/20 transition-all">
            <FaPlus /> নতুন ছবি
          </button>
        </div>

        {isLoading ? <Loading /> : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                  <button onClick={() => showConfirm({
                    title: "ছবিটি মুছে ফেলবেন?",
                    description: item.caption ? `"${item.caption}" — গ্যালারি থেকে স্থায়ীভাবে মুছে যাবে।` : "ছবিটি গ্যালারি থেকে স্থায়ীভাবে মুছে যাবে।",
                    confirmLabel: "হ্যাঁ, মুছে দাও",
                    variant: "danger",
                    onConfirm: () => deleteItem(item._id),
                  })} className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"><FaTrash className="text-sm" /></button>
                </div>
                {item.caption && <div className="p-2"><p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.caption}</p></div>}
              </div>
            ))}
            {items.length === 0 && <div className="col-span-full text-center py-16 text-gray-400">কোনো ছবি নেই</div>}
          </div>
        )}
      </div>
      {modal && <GalleryModal initial={modal.data} onClose={() => setModal(null)} onSave={handleSave} loading={adding || editing} />}
    </RoleGuard>
  );
}
