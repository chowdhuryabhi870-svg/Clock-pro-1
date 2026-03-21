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
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {
    title: "Clock App",
    body: "New Notification!"
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192.png'
    })
  );
});
