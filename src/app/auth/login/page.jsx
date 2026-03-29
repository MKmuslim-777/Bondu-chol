"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SocialLogin from "@/components/SocialLogin";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { signInUser } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        toast.success("লগইন সফল!");
        router.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="md:w-1/2 relative hidden md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://i.ibb.co.com/GfCqqqzV/PXL-20260123-111923382-PORTRAIT-ORIGINAL.jpg" alt="Travel" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/20">
            <h2 className="text-4xl font-black mb-4 tracking-tight text-white">বন্ধু চল!</h2>
            <p className="text-lg font-medium">আবার স্বাগতম, বন্ধু।</p>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">লগইন করো</h2>
          <p className="text-sm text-gray-600 mb-6">তোমার অ্যাকাউন্টে প্রবেশ করো।</p>

          <SocialLogin />
          <div className="relative flex items-center justify-center my-5">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-400 text-sm">অথবা</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">ইমেইল</label>
              <input
                type="email"
                {...register("email", { required: "ইমেইল দেওয়া আবশ্যক" })}
                className={`mt-1 text-black block w-full px-4 py-3 bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
                placeholder="example@gmail.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">পাসওয়ার্ড</label>
              <input
                type="password"
                {...register("password", { required: "পাসওয়ার্ড আবশ্যক" })}
                className={`mt-1 text-black block w-full px-4 py-3 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold text-black bg-yellow-500 hover:bg-yellow-600 transition-all">
              লগইন করো
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/auth/register" className="font-bold text-yellow-600 hover:underline">রেজিস্ট্রেশন করো</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
