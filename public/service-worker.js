
const CACHE_NAME = 'anuj-portfolio-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Simple install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Simple activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Simplified fetch handler
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests and extensions
  if (request.method !== 'GET' || request.url.startsWith('chrome-extension:')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(request);
      })
      .catch(() => {
        // Return offline fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
        throw new Error('Network error occurred');
      })
  );
});
