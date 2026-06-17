const CACHE_NAME = "tuned-performance-pwa-v4";

const CORE_ASSETS = [
  "./",
  "./about.html",
  "./index.html",
  "./areas.html",
  "./availability.html",
  "./car-services-ashford.html",
  "./car-services-bedfont.html",
  "./car-services-feltham.html",
  "./car-services-hounslow.html",
  "./car-services-kingston.html",
  "./car-services-sunbury.html",
  "./contact.html",
  "./cancellation-policy.html",
  "./cookies.html",
  "./ecu-remapping.html",
  "./estimator.html",
  "./faq.html",
  "./gallery.html",
  "./mot-support.html",
  "./obd-diagnostics.html",
  "./pricing.html",
  "./privacy-gdpr.html",
  "./reviews.html",
  "./scratch-bumper-repairs.html",
  "./services.html",
  "./single-panel-repair-respray.html",
  "./thank-you.html",
  "./terms.html",
  "./trim-fitment.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/area-coverage.png",
  "./assets/hero-bmw-m3-dark.jpg",
  "./assets/hero-bmw-m3-mobile.jpg",
  "./assets/hero-workshop.png",
  "./assets/real-air-filters-intakes.jpg",
  "./assets/real-bumper-scratch-spot-repairs.jpg",
  "./assets/real-dyno-mapping.jpg",
  "./assets/real-ecu-remapping.jpg",
  "./assets/real-exhaust-tips.png",
  "./assets/real-mirror-caps-installed-1.jpg",
  "./assets/real-mirror-caps-installed-2.jpg",
  "./assets/real-mirror-caps.jpg",
  "./assets/real-mot.jpg",
  "./assets/real-obd-scanning.jpg",
  "./assets/real-small-scratch-repairs.jpg",
  "./assets/service-diagnostics-photo.jpg",
  "./assets/service-diagnostics.png",
  "./assets/service-fitment-photo.jpg",
  "./assets/service-mot-photo.jpg",
  "./assets/service-performance.png",
  "./assets/service-remap-photo.jpg",
  "./assets/service-repair-photo.jpg",
  "./assets/service-repair.png",
  "./assets/tuned-car-lineup.jpg",
  "./assets/tuned-performance-logo-cropped.jpg",
  "./assets/tuned-performance-logo-cropped.png",
  "./assets/tuned-performance-logo.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
