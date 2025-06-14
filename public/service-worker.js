
const CACHE_NAME = 'anuj-portfolio-v3';
const STATIC_CACHE = 'static-v3';
const RUNTIME_CACHE = 'runtime-v3';

// Enhanced cache configuration
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
    cacheName: 'images-v3',
    maxEntries: 100,
    maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
  },
  api: {
    pattern: /^https:\/\/api\./,
    strategy: 'NetworkFirst',
    cacheName: 'api-cache-v3',
    maxEntries: 50,
    maxAgeSeconds: 5 * 60 // 5 minutes
  },
  fonts: {
    pattern: /\.(?:woff|woff2|ttf|otf)$/,
    strategy: 'CacheFirst',
    cacheName: 'fonts-v3',
    maxEntries: 30,
    maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
  },
  external: {
    pattern: /^https:\/\/(leetcard\.jacoblin\.cool|media\.geeksforgeeks\.org|user-images\.githubusercontent\.com)/,
    strategy: 'CacheFirst',
    cacheName: 'external-images-v3',
    maxEntries: 50,
    maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
  }
};

// Enhanced install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Enhanced activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const validCaches = new Set([
        CACHE_NAME,
        STATIC_CACHE,
        RUNTIME_CACHE,
        ...Object.values(RUNTIME_CACHING).map(config => config.cacheName)
      ]);

      return Promise.all(
        cacheNames
          .filter(cacheName => !validCaches.has(cacheName))
          .map(cacheName => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => {
      console.log('Service Worker activated successfully');
      return self.clients.claim();
    })
    .catch(error => {
      console.error('Service Worker activation failed:', error);
    })
  );
});

// Enhanced fetch event with better error handling
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome extensions
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Skip analytics and tracking requests
  if (url.hostname.includes('analytics') || url.hostname.includes('tracking')) {
    return;
  }

  event.respondWith(
    handleRequest(request).catch(error => {
      console.error('Fetch failed:', error);
      return new Response('Network error occurred', { 
        status: 503,
        statusText: 'Service Unavailable'
      });
    })
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

  // Default: network first for everything else
  return networkFirst(request, RUNTIME_CACHE);
}

async function cacheFirst(request, cacheName, maxAge) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
      // Check cache freshness
      if (maxAge) {
        const cachedDate = new Date(cached.headers.get('date') || cached.headers.get('last-modified') || '0');
        const now = new Date();
        if (now.getTime() - cachedDate.getTime() > maxAge * 1000) {
          // Cache expired, update in background
          updateCacheInBackground(request, cache);
        }
      }
      return cached;
    }

    // Not in cache, fetch and cache
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.warn('Cache first strategy failed:', error);
    // Fallback to network
    return fetch(request);
  }
}

async function networkFirst(request, cacheName, maxAge) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.warn('Network request failed, trying cache:', error);
    
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
  } catch (error) {
    console.warn('Background cache update failed:', error);
  }
}

// Enhanced error handling for push notifications
self.addEventListener('push', event => {
  console.log('Push notification received');
  
  if (!event.data) {
    console.warn('Push event has no data');
    return;
  }

  try {
    const options = {
      body: event.data.text(),
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'view',
          title: 'View Portfolio',
          icon: '/icons/icon-192x192.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification('Anuj Portfolio Update', options)
    );
  } catch (error) {
    console.error('Push notification failed:', error);
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

async function performBackgroundSync() {
  try {
    console.log('Performing background sync...');
    // Implement background tasks here
    console.log('Background sync completed successfully');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}
