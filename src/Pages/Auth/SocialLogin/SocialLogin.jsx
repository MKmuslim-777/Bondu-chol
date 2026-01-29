import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axios.post("/users", userInfo).then((res) => {
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.error("Google Sign In Error:", error);
      });
  };

  return (
    <div className="w-full">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle className="text-2xl" />
        <span>গুগল দিয়ে লগইন</span>
      </button>
    </div>
  );
};

export default SocialLogin;
