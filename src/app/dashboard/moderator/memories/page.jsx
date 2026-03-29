"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import { FaImages, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function ModeratorMemoriesPage() {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: memories = [] } = useQuery({
    queryKey: ["mod-memories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/memories");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  return (
    <RoleGuard allowed={["moderator", "admin"]}>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
            <FaImages className="text-yellow-500" /> স্মৃতি পর্যালোচনা
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">মোট {memories.length}টি স্মৃতি</p>
        </div>

        {isLoading ? <Loading /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map((m) => (
              <div key={m._id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-yellow-400/50 transition-all">
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-black text-gray-800 dark:text-white text-sm mb-2">{m.title || "শিরোনাম নেই"}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {m.location && <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-500" />{m.location}</span>}
                    {m.createdAt && <span className="flex items-center gap-1"><FaCalendarAlt className="text-yellow-500" />{new Date(m.createdAt).toLocaleDateString("bn-BD")}</span>}
                  </div>
                </div>
              </div>
            ))}
            {memories.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400">
                <FaImages className="text-5xl mx-auto mb-3 opacity-20" />
                <p className="font-bold">কোনো স্মৃতি পাওয়া যায়নি</p>
              </div>
            )}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
