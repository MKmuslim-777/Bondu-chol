"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import Loading from "@/components/shared/Loading";
import RefreshButton from "@/components/shared/RefreshButton";
import { FaUsers, FaSearch, FaEnvelope, FaComments } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

function FriendCard({ friend }) {
  const initials = friend.displayName?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-1">
      {/* Top gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5">
        {/* Avatar + online dot */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            {friend.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={friend.photoURL}
                alt={friend.displayName}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 dark:border-gray-800 group-hover:border-yellow-400/60 transition-all shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-lg">{initials}</span>
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5 mb-1">
              <p className="font-black text-gray-900 dark:text-white text-base truncate leading-tight">
                {friend.displayName}
              </p>
              <MdVerified className="text-yellow-500 flex-shrink-0 text-base" />
            </div>
            <p className="text-xs text-gray-400 truncate flex items-center gap-1.5 mb-2">
              <FaEnvelope className="flex-shrink-0 text-gray-300 dark:text-gray-600" />
              {friend.email}
            </p>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/40 text-[10px] font-black rounded-full uppercase tracking-wide">
              ⭐ Bara Member
            </span>
          </div>
        </div>

        {/* Action */}
        <Link
          href="/dashboard/bara-chat"
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-yellow-500 dark:hover:bg-yellow-500 text-gray-500 dark:text-gray-400 hover:text-black text-xs font-bold transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-yellow-500"
        >
          <FaComments className="text-sm" />
          Chat
        </Link>
      </div>
    </div>
  );
}

export default function DashboardFriendsPage() {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { isLoading, data: friends = [] } = useQuery({
    queryKey: ["dashboard-friends"],
    queryFn: async () => {
      const res = await axios.get("/users/bara");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filtered = friends.filter((f) =>
    f.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    f.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
            <FaUsers className="text-yellow-500" /> Friends
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Bara members — {friends.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-yellow-400 w-56"
            />
          </div>
          <RefreshButton onRefresh={() => queryClient.invalidateQueries({ queryKey: ["dashboard-friends"] })} />
        </div>
      </div>

      {isLoading ? <Loading /> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((f) => <FriendCard key={f._id} friend={f} />)}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <FaUsers className="text-5xl mx-auto mb-3 opacity-20" />
              <p className="font-bold">No friends found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
