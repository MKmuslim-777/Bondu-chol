"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import Loading from "@/components/shared/Loading";
import RoleGuard from "@/components/shared/RoleGuard";
import FriendCard from "@/components/FriendCard";
import { FaStar } from "react-icons/fa";

export default function BaraMembersPage() {
  const axios = useAxios();

  const { isLoading, data: members = [] } = useQuery({
    queryKey: ["bara-members"],
    queryFn: async () => {
      const res = await axios.get("/users/bara");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  return (
    <RoleGuard allowed={["admin"]}>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
            <FaStar className="text-yellow-500" /> Bara সদস্যবৃন্দ
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            বিশেষ মর্যাদার Bara সদস্যদের তালিকা — মোট {members.length} জন
          </p>
        </div>

        {isLoading ? <Loading /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((m) => <FriendCard key={m._id} friend={m} />)}
            </div>
            {members.length === 0 && (
              <div className="text-center py-20 text-gray-400">কোনো Bara সদস্য নেই</div>
            )}
          </>
        )}
      </div>
    </RoleGuard>
  );
}
