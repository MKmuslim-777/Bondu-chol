import React, { useState } from "react"; // useState যোগ করা হয়েছে
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // চোখের আইকন ইমপোর্ট
import Logo from "../../../Shared/Logo";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড হাইড/শো স্টেট

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full flex flex-col md:flex-row-reverse bg-white shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden border border-gray-100">
        {/* Left Side: Image Content (Mobile-এ উপরে বা নিচে সুন্দরভাবে দেখাবে) */}
        <div className="w-full md:w-1/2 bg-yellow-500 relative h-48 md:h-auto overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
            alt="Adventure Login"
            className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center bg-black/40">
            <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">
              স্বাগতম বন্ধু!
            </h2>
            <p className="text-sm md:text-lg font-medium italic opacity-90">
              "স্মৃতিরা ফিরে আসে, যখন তুমি ফিরে আসো।"
            </p>
          </div>
        </div>

        {/* Right Side: Login Form Content */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
          {/* Logo */}
          <div className="flex justify-center md:justify-start mb-8 text-black">
            <Logo />
          </div>

          <div className="text-center md:text-left mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              লগইন করো
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              তোমার বন্ধুদের সাথে আবার যুক্ত হও।
            </p>
          </div>

          <div className="space-y-6">
            <SocialLogin />

            <div className="relative flex items-center justify-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest font-medium">
                অথবা ইমেইল
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  ইমেইল ঠিকানা
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "ইমেইল দেওয়া আবশ্যক",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "সঠিক ইমেইল ফরম্যাট ব্যবহার করো",
                    },
                  })}
                  className={`block w-full px-4 py-3 bg-gray-50 border text-black ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-xl focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none`}
                  placeholder="name@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    পাসওয়ার্ড
                  </label>
                  <a
                    href="#"
                    className="text-xs font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
                  >
                    ভুলে গেছো?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // স্টেট অনুযায়ী টাইপ চেঞ্জ
                    {...register("password", {
                      required: "পাসওয়ার্ড আবশ্যক",
                      minLength: {
                        value: 6,
                        message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
                      },
                    })}
                    className={`block w-full px-4 py-3 bg-gray-50 text-black border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-xl focus:ring-2 focus:ring-yellow-500 focus:bg-white transition-all outline-none`}
                    placeholder="••••••••"
                  />
                  {/* Eye Icon Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-600 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl shadow-lg shadow-yellow-200/50 text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-600 transform transition-all active:scale-[0.98] hover:shadow-xl"
              >
                ভিতরে চলো
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            নতুন বন্ধু?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-yellow-600 hover:underline decoration-2 underline-offset-4"
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
