import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loaders/Loading";
import useAxios from "../../Hooks/useAxios";
import FriendCard from "../../Components/FriendCard/FriendCard";

const Friends = () => {
  const axios = useAxios();

  const {
    isLoading,
    data: friends = [],
    refetch,
  } = useQuery({
    queryKey: ["friend"],
    queryFn: async () => {
      const res = await axios.get("/users/bara");
      console.log("API Response Data:", res.data);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) return <Loading></Loading>;
  refetch();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4 italic">
          My{" "}
          <span className="text-primary underline decoration-wavy underline-offset-8">
            Bara
          </span>{" "}
          Friends
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Connecting with those who matter the most.
        </p>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {friends.map((friend) => (
          <FriendCard friend={friend} key={friend._id}></FriendCard>
        ))}
      </div>

      {/* Empty State */}
      {friends.length === 0 && (
        <div className="text-center py-20 opacity-50 text-xl">
          No friends found with role "bara".
        </div>
      )}
    </div>
  );
};

export default Friends;
