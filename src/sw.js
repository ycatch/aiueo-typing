var CACHE_NAME = '2022-07-03 14:50';
var urlsToCache = [
  "/aiueo-typing/",
  "/aiueo-typing/index.js",
  "/aiueo-typing/mp3/bgm.mp3",
  "/aiueo-typing/mp3/cat.mp3",
  "/aiueo-typing/mp3/correct.mp3",
  "/aiueo-typing/mp3/end.mp3",
  "/aiueo-typing/mp3/keyboard.mp3",
  "/aiueo-typing/favicon/favicon.svg",
  "https://github.com/ycatch/fonts/textar-light.woff2",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/simple-keyboard@3.4.52/build/index.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
