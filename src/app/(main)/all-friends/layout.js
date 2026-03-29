export const metadata = {
  title: "আমাদের বারা বন্ধুরা — বন্ধু চল",
  description: "বন্ধু চল এর সকল বারা সদস্যদের সাথে পরিচিত হও। একসাথে ভ্রমণ ও আড্ডার বন্ধুরা।",
  keywords: ["বারা বন্ধু", "বন্ধু চল", "bara friends", "travel friends", "Bangladesh"],
  alternates: { canonical: "https://bonduchol.com/all-friends" },
  openGraph: {
    title: "আমাদের বারা বন্ধুরা — বন্ধু চল",
    description: "বন্ধু চল এর সকল বারা সদস্যদের সাথে পরিচিত হও।",
    url: "https://bonduchol.com/all-friends",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "বন্ধু চল বন্ধুরা" }],
  },
};

export default function AllFriendsLayout({ children }) {
  return children;
}
