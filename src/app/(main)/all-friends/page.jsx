"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import Loading from "@/components/shared/Loading";
import FriendCard from "@/components/FriendCard";

export default function FriendsPage() {
  const axios = useAxios();

  const { isLoading, data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const res = await axios.get("/users/bara");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4 italic">
          My <span className="text-primary underline decoration-wavy underline-offset-8">Bara</span> Friends
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Connecting with those who matter the most.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {friends.map((friend) => (
          <FriendCard friend={friend} key={friend._id} />
        ))}
      </div>

      {friends.length === 0 && (
        <div className="text-center py-20 opacity-50 text-xl">No friends found with role "bara".</div>
      )}
    </div>
  );
}
