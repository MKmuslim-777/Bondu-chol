"use client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useAxiosSecure } from "./useAxiosSecure";

export function useRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    retry: false,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}/role`);
        return res.data?.role || "user";
      } catch {
        return "user";
      }
    },
  });

  return { roleLoading, role };
}
