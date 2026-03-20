const CACHE_NAME = "clock-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/icon-192.png",
  "/icon-512.png",
  "/style.css"   // যদি আলাদা css থাকে
];

// Install event → cache everything
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event → serve cached first, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
