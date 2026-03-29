export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/event", "/gallery", "/all-friends"],
        disallow: ["/dashboard/", "/api/"],
      },
    ],
    sitemap: "https://bonduchol.com/sitemap.xml",
  };
}
