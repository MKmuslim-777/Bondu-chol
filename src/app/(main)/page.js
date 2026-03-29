import Banner from "@/components/Banner";
import Memories from "@/components/Memories";
import TravelStats from "@/components/TravelStats";
import HomeGallery from "@/components/HomeGallery";
import FriendsTestimonials from "@/components/FriendsTestimonials";

export const metadata = {
  title: "বন্ধু চল — বন্ধু চল যাই দুনিয়া দেখি",
  description: "বন্ধু চল — বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম। একসাথে নতুন স্মৃতি গড়ি।",
  alternates: { canonical: "https://bonduchol.com" },
  openGraph: {
    title: "বন্ধু চল — বন্ধু চল যাই দুনিয়া দেখি",
    description: "বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম।",
    url: "https://bonduchol.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "বন্ধু চল" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "বন্ধু চল",
  url: "https://bonduchol.com",
  description: "বন্ধুদের সাথে ভ্রমণ, স্মৃতি ও আড্ডার একটি বিশেষ প্ল্যাটফর্ম।",
  inLanguage: "bn",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://bonduchol.com/event?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <Banner />
        <Memories />
        <TravelStats />
        <HomeGallery />
        <FriendsTestimonials />
      </section>
    </>
  );
}
