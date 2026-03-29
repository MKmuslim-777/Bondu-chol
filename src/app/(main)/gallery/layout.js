export const metadata = {
  title: "গ্যালারি — বন্ধু চল",
  description: "বন্ধু চল এর ফটো গ্যালারি। আমাদের ভ্রমণ ও আড্ডার সেরা মুহূর্তগুলো একসাথে দেখুন।",
  keywords: ["গ্যালারি", "ছবি", "বন্ধু চল", "ভ্রমণ", "gallery", "photos", "travel memories"],
  alternates: { canonical: "https://bonduchol.com/gallery" },
  openGraph: {
    title: "গ্যালারি — বন্ধু চল",
    description: "বন্ধু চল এর ফটো গ্যালারি। আমাদের ভ্রমণ ও আড্ডার সেরা মুহূর্তগুলো।",
    url: "https://bonduchol.com/gallery",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "বন্ধু চল গ্যালারি" }],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
