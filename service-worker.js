const CACHE_NAME = "thelens-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/muti.html",
  "/manifest.json",
  "/logo3.PNG",
  "/logo3.PNG"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
