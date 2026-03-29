"use client";
import { useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useAxiosSecure() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({ baseURL: "/api" });

    instance.interceptors.request.use(async (config) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        } catch {
          if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
          }
        }
      }
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          signOutUser().then(() => router.push("/auth/login"));
        }
        return Promise.reject(error);
      }
    );

    return instance;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  return axiosSecure;
}
