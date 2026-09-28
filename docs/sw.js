// Offline cache. Bump VERSION whenever you change any app file.
const VERSION = 'vedic-diet-v15';
const FONTS_CACHE = 'vedic-fonts';
const FILES = [
  './', './index.html', './styles.css', './data.js', './data-foods.js', './data-learn.js',
  './data-quiz.js', './data-wisdom.js', './data-recipes.js', './recipes.js', './art.js', './views.js', './app.js', './manifest.json',
  './icon-180.png', './icon-512.png', './favicon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => (k.startsWith('pitta-plate') || k.startsWith('vedic-diet')) && k !== VERSION)
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fonts: cache-first, store even opaque responses. App files: network-first with cache fallback.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS_CACHE).then((c) =>
        c.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
          if (res.ok || res.type === 'opaque') c.put(e.request, res.clone());
          return res;
        }))
      )
    );
    return;
  }

  if (url.origin !== location.origin) return;

  const isNav = e.request.mode === 'navigate';
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((r) => r || (isNav ? caches.match('./index.html') : undefined))
      )
  );
});
