import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Side: Image */}
        <div className="md:w-1/2 bg-yellow-500 relative hidden md:block">
          <img
            src="https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg"
            alt="Travel"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/20">
            <h2 className="text-4xl font-black mb-4 tracking-tight text-white">
              বন্ধু চল!
            </h2>
            <p className="text-lg font-medium">একসাথে নতুন স্মৃতি গড়ি।</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              অ্যাকাউন্ট তৈরি করো
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              সবাই মিলে দুনিয়া দেখার শুরু এখান থেকেই।
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95"
              onClick={() => console.log("Google Login Clicked")}
            >
              <FcGoogle className="text-2xl" />
              <span>গুগল দিয়ে সাইন-আপ করো</span>
            </button> */}
            <SocialLogin />

            <div className="relative flex items-center justify-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">
                অথবা
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Registration Form with React Hook Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  নাম
                </label>
                <input
                  type="text"
                  {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
                  className={`mt-1 text-black block w-full px-4 py-3 bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all`}
                  placeholder="তোমার নাম"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  ইমেইল
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "ইমেইল দেওয়া আবশ্যক",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "সঠিক ইমেইল ফরম্যাট ব্যবহার করো",
                    },
                  })}
                  className={`mt-1 text-black block w-full px-4 py-3 bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all`}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "পাসওয়ার্ড আবশ্যক",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                    },
                  })}
                  className={`mt-1 text-black block w-full px-4 py-3 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition-all active:scale-95"
              >
                রেজিস্ট্রেশন করো
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-yellow-600 hover:underline cursor-pointer"
            >
              লগইন করো
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
