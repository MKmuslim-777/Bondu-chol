"use client";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Loading from "./Loading";

export default function RoleGuard({ allowed = [], children }) {
  const { role, roleLoading } = useRole();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (!roleLoading && !allowed.includes(role) && !redirected.current) {
      redirected.current = true;
      router.replace("/dashboard");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, roleLoading]);

  if (roleLoading) return <Loading />;
  if (!allowed.includes(role)) return null;
  return children;
}
