const CACHE_NAME = "bonduchol-v1";
const STATIC_ASSETS = ["/", "/event", "/gallery", "/all-friends", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Skip non-GET, API, socket requests
  if (
    e.request.method !== "GET" ||
    e.request.url.includes("/api/") ||
    e.request.url.includes("/api/socket")
  ) return;

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Cache successful HTML/CSS/JS responses
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
