const CACHE_NAME = "tuned-performance-pwa-v35";

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
  "./bmw-mini-coding.html",
  "./ecu-remapping.html",
  "./estimator.html",
  "./faq.html",
  "./gallery.html",
  "./mot-support.html",
  "./obd-diagnostics.html",
  "./pricing.html",
  "./privacy-gdpr.html",
  "./recent-jobs.html",
  "./refer-a-friend.html",
  "./reviews.html",
  "./scratch-bumper-repairs.html",
  "./services.html",
  "./single-panel-repair-respray.html",
  "./thank-you.html",
  "./customer-thank-you.html",
  "./bumper-repair-feltham.html",
  "./single-panel-respray-feltham.html",
  "./mobile-obd-diagnostics-feltham.html",
  "./bmw-mini-coding-feltham.html",
  "./car-repair-photo-guide.html",
  "./mot-warning-light-guide.html",
  "./bmw-mini-coding-guide.html",
  "./terms.html",
  "./trim-fitment.html",
  "./styles.css?v=35",
  "./script.js?v=30",
  "./manifest.webmanifest",
  "./README.MD",
  "./llms.txt",
  "./llms-full.txt",
  "./robots.txt",
  "./sitemap.xml",
  "./assets/tp-app-icon-192.png",
  "./assets/tp-app-icon-512.png",
  "./assets/tp-apple-touch-icon.png",
  "./assets/tp-favicon-32.png",
  "./assets/tp-favicon-16.png",
  "./assets/area-coverage.png",
  "./assets/estimator-reference-scratch.png",
  "./assets/hero-reference-bmw.png",
  "./assets/hero-workshop.png",
  "./assets/icon-benefit-clock.svg",
  "./assets/icon-benefit-pin.svg",
  "./assets/icon-benefit-shield.svg",
  "./assets/icon-estimator-camera.svg",
  "./assets/icon-estimator-calc.svg",
  "./assets/icon-estimator-check.svg",
  "./assets/icon-service-battery.svg",
  "./assets/icon-service-brakes.svg",
  "./assets/icon-service-diagnostics.svg",
  "./assets/icon-service-maintenance.svg",
  "./assets/icon-service-mot.svg",
  "./assets/icon-service-repairs.svg",
  "./assets/icon-trust-pound.svg",
  "./assets/icon-trust-shield.svg",
  "./assets/icon-trust-star.svg",
  "./assets/icon-trust-truck.svg",
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
  "./assets/tp-logo-mark.png",
  "./assets/tp-logo-wordmark.jpg"
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
