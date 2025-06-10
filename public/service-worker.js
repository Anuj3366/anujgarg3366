
const CACHE_NAME = 'anuj-portfolio-v2';
const STATIC_CACHE = 'static-v2';
const RUNTIME_CACHE = 'runtime-v2';

// Cache different types of resources
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

const RUNTIME_CACHING = {
  images: {
    pattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    strategy: 'CacheFirst',
    cacheName: 'images',
    maxEntries: 50,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  api: {
    pattern: /^https:\/\/api\./,
    strategy: 'NetworkFirst',
    cacheName: 'api-cache',
    maxEntries: 50,
    maxAgeSeconds: 5 * 60 // 5 minutes
  },
  fonts: {
    pattern: /\.(?:woff|woff2|ttf|otf)$/,
    strategy: 'CacheFirst',
    cacheName: 'fonts',
    maxEntries: 30,
    maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
  }
};

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !Object.values({
            CACHE_NAME,
            STATIC_CACHE,
            RUNTIME_CACHE,
            ...Object.fromEntries(Object.values(RUNTIME_CACHING).map(config => [config.cacheName, config.cacheName]))
          }).includes(cacheName))
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') return;

  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Handle static assets
  if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
    return cacheFirst(request, STATIC_CACHE);
  }

  // Handle runtime caching
  for (const [type, config] of Object.entries(RUNTIME_CACHING)) {
    if (config.pattern.test(url.pathname) || config.pattern.test(url.href)) {
      switch (config.strategy) {
        case 'CacheFirst':
          return cacheFirst(request, config.cacheName, config.maxAgeSeconds);
        case 'NetworkFirst':
          return networkFirst(request, config.cacheName, config.maxAgeSeconds);
        default:
          break;
      }
    }
  }

  // Default: try network first, fallback to cache
  return networkFirst(request, RUNTIME_CACHE);
}

async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    // Check if cached response is still valid
    if (maxAge) {
      const cachedDate = new Date(cached.headers.get('date'));
      const now = new Date();
      if (now.getTime() - cachedDate.getTime() > maxAge * 1000) {
        // Cache expired, try to update
        updateCache(request, cache);
      }
    }
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('Network request failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

async function networkFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('Network request failed, trying cache:', error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    return new Response('Network error and no cache available', { status: 503 });
  }
}

async function updateCache(request, cache) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.log('Failed to update cache:', error);
  }
}

// Background sync for better performance
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background tasks here
  console.log('Background sync completed');
}

// Push notifications support
self.addEventListener('push', event => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification('Anuj Portfolio', options)
    );
  }
});
