
const CACHE_NAME = "NEET-Learning-Hub-v4";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./learn.html",
  "./solve.html"
];

/* =========================
   INSTALL EVENT
========================= */

self.addEventListener("install", event => {

  console.log("SW Installing...");

  self.skipWaiting(); // 🔥 force latest SW activate

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

/* =========================
   ACTIVATE EVENT (IMPORTANT FIX)
========================= */

self.addEventListener("activate", event => {

  console.log("SW Activating...");

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

/* =========================
   FETCH EVENT
========================= */

self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
