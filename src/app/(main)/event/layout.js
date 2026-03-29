export const metadata = {
  title: "ইভেন্ট — বন্ধু চল",
  description: "বন্ধু চল এর সকল ইভেন্ট দেখুন। ট্যুর, আড্ডা, পিকনিক ও অ্যাডভেঞ্চার — সব কিছুর খবর এখানে।",
  keywords: ["ইভেন্ট", "ট্যুর", "আড্ডা", "পিকনিক", "বন্ধু চল", "events", "tour", "Bangladesh travel"],
  alternates: { canonical: "https://bonduchol.com/event" },
  openGraph: {
    title: "ইভেন্ট — বন্ধু চল",
    description: "বন্ধু চল এর সকল ইভেন্ট। ট্যুর, আড্ডা, পিকনিক ও অ্যাডভেঞ্চার।",
    url: "https://bonduchol.com/event",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "বন্ধু চল ইভেন্ট" }],
  },
};

export default function EventLayout({ children }) {
  return children;
}
