const CACHE_NAME = "clock-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png",
  "./screen1.png",
  "./screen2.png",
  "./screen3.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
self.addEventListener('sync', event => {
  if (event.tag === 'sync-clock-data') {
    event.waitUntil(
      // Example: send cached data to server
      sendCachedDataToServer()
    );
  }
});

// Function to simulate sending data
async function sendCachedDataToServer() {
  const cache = await caches.open('clock-app-cache-v1');
  // Retrieve some cached requests (example)
  const cachedRequests = await cache.keys();
  for (const request of cachedRequests) {
    // Normally you would send data to server here
    console.log('Would sync request:', request.url);
  }
}
