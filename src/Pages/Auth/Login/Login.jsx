import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import Logo from "../../../Shared/Logo";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 flex flex-col md:flex-row-reverse bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Side: Image Content */}
        <div className="md:w-1/2 bg-yellow-500 relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
            alt="Adventure Login"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/30">
            <h2 className="text-4xl font-black mb-4 tracking-tight">
              স্বাগতম বন্ধু!
            </h2>
            <p className="text-lg font-medium italic">
              "স্মৃতিরা ফিরে আসে, যখন তুমি ফিরে আসো।"
            </p>
          </div>
        </div>

        {/* Right Side: Login Form Content */}
        <div className="md:w-1/2 p-8 md:p-12 self-center">
          {/* Logo Placement */}
          <div className="flex justify-center md:justify-start mb-6">
            <div className="scale-110">
              {/* <Logo /> */}
              {/* আপনার লোগো কম্পোনেন্টটি এখানে আনকমেন্ট করে দিন */}
              <div className="text-black tracking-tighter">
                <Logo></Logo>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              লগইন করো
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              তোমার বন্ধুদের সাথে আবার যুক্ত হও।
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {/* Google Login Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 font-bold hover:bg-gray-50 transition-all active:scale-95"
              onClick={() => console.log("Google Login")}
            >
              <FcGoogle className="text-2xl" />
              <span>গুগল দিয়ে লগইন</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm italic">
                অথবা ইমেইল দিয়ে
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Login Form with react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  ইমেইল ঠিকানা
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
                  className={`mt-1 block w-full px-4 py-3 bg-gray-50 border text-black ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none`}
                  placeholder="name@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">
                    পাসওয়ার্ড
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-yellow-600 hover:text-yellow-500"
                  >
                    পাসওয়ার্ড ভুলে গেছো?
                  </a>
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "পাসওয়ার্ড আবশ্যক",
                    minLength: {
                      value: 6,
                      message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                    },
                  })}
                  className={`mt-1 block w-full px-4 py-3 bg-gray-50 text-black border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none`}
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
                className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition-all active:scale-95 shadow-yellow-200/50"
              >
                ভিতরে চলো
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            নতুন বন্ধু?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-yellow-600 hover:underline"
            >
              একটি অ্যাকাউন্ট খোলো
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
