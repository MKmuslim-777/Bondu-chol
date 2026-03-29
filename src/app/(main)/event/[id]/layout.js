import { getDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function generateMetadata({ params }) {
  try {
    const db = await getDB();
    const event = await db.collection("events").findOne({ _id: new ObjectId(params.id) });
    if (!event) {
      return { title: "ইভেন্ট পাওয়া যায়নি — বন্ধু চল" };
    }
    return {
      title: `${event.title} — বন্ধু চল`,
      description: event.description || `বন্ধু চল এর ইভেন্ট: ${event.title}`,
      keywords: [event.title, "ইভেন্ট", "বন্ধু চল", ...(event.tags || [])],
      openGraph: {
        title: event.title,
        description: event.description || `বন্ধু চল এর ইভেন্ট: ${event.title}`,
        images: event.coverURL ? [{ url: event.coverURL, width: 1200, height: 630, alt: event.title }] : [],
        url: `/event/${params.id}`,
      },
    };
  } catch {
    return { title: "ইভেন্ট — বন্ধু চল" };
  }
}

export default function EventDetailLayout({ children }) {
  return children;
}
