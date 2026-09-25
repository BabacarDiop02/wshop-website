/* Service worker minimal (#30) : met en cache les pages et assets statiques
 * pour un chargement plus rapide et une consultation possible hors-ligne
 * des pages déjà visitées. Incrémentez CACHE_NAME après toute modification
 * importante du site pour forcer le rafraîchissement du cache. */
const CACHE_NAME = 'wshop-cache-v1';
const CORE_ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'css/dark-mode.css',
  'css/portfolio.css',
  'css/components.css',
  'js/data/site-config.js',
  'js/data/projects.js',
  'js/data/testimonials.js',
  'js/i18n/fr.js',
  'js/i18n/en.js',
  'js/modules/theme.js',
  'js/modules/i18n.js',
  'js/modules/portfolio.js',
  'favicon.ico',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
