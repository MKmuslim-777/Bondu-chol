import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "লগইন ও রেজিস্ট্রেশন — বন্ধু চল",
  description: "বন্ধু চল এ লগইন করুন বা নতুন অ্যাকাউন্ট তৈরি করুন।",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
