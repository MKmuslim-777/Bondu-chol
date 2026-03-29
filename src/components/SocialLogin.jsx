"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/hooks/useAxios";
import LoginSuccessLoader from "./shared/LoginSuccessLoader";

export default function SocialLogin() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { signInGoogle } = useAuth();
  const router = useRouter();
  const axios = useAxios();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        axios.post("/users", userInfo).then(() => {
          setLoginSuccess(true);
          setTimeout(() => router.push("/"), 1500);
        });
      })
      .catch((err) => console.error(err));
  };

  if (loginSuccess) return <LoginSuccessLoader />;

  return (
    <button onClick={handleGoogleSignIn} type="button"
      className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
      <FcGoogle className="text-xl mr-3 group-hover:scale-110 transition-transform" />
      <span>Continue with Google</span>
    </button>
  );
}
