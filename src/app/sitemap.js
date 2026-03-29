import { getDB } from "@/lib/mongodb";

export default async function sitemap() {
  const baseUrl = "https://bonduchol.com";

  const staticRoutes = [
    { url: baseUrl,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/event`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${baseUrl}/gallery`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/all-friends`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/auth/login`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${baseUrl}/auth/register`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  // Dynamic event pages
  try {
    const db = await getDB();
    const events = await db.collection("events").find({}, { projection: { _id: 1, updatedAt: 1 } }).toArray();
    const eventRoutes = events.map((e) => ({
      url: `${baseUrl}/event/${e._id}`,
      lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    return [...staticRoutes, ...eventRoutes];
  } catch {
    return staticRoutes;
  }
}
