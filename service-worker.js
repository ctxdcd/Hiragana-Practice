/* Hiragana Practice - service worker
   Bump CACHE_VERSION whenever you change any cached file so users get the update. */
const CACHE_VERSION = "v3";
const CACHE_NAME = "hiragana-practice-" + CACHE_VERSION;

const PRECACHE_URLS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/icon-maskable-512.png",
    "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key.startsWith("hiragana-practice-") && key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Page navigations: cache first, fall back to the app shell when offline.
    if (request.mode === "navigate") {
        event.respondWith(
            caches.match(request, { ignoreSearch: true })
                .then(cached => cached || caches.match("./index.html"))
                .then(cached => cached || fetch(request))
        );
        return;
    }

    // Everything else: cache first, then network (and cache what we fetch).
    event.respondWith(
        caches.match(request).then(cached => {
            if (cached) return cached;
            return fetch(request).then(response => {
                if (response && response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                }
                return response;
            });
        })
    );
});