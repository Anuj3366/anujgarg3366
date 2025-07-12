
const CACHE_NAME = 'anuj-portfolio-v5';
const STATIC_CACHE = 'static-cache-v5';
const RUNTIME_CACHE = 'runtime-cache-v5';
const IMAGE_CACHE = 'image-cache-v5';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/custom-favicon.svg'
];

// Install event with enhanced caching
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Install error:', error);
      })
  );
});

// Activate event with cache cleanup
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const validCaches = [STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE];
        return Promise.all(
          cacheNames
            .filter(cacheName => !validCaches.includes(cacheName))
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
      .catch(error => {
        console.error('[SW] Activate error:', error);
      })
  );
});

// Enhanced fetch handler with different strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and extensions
  if (request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // Skip API requests to Supabase
  if (url.hostname.includes('supabase.co')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Static assets - Cache First strategy
    if (STATIC_ASSETS.some(asset => url.pathname === asset || url.pathname.endsWith(asset))) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Images - Cache First with long expiration
    if (request.destination === 'image' || /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname)) {
      return await cacheFirst(request, IMAGE_CACHE);
    }
    
    // CSS and JS files - Stale While Revalidate
    if (request.destination === 'script' || request.destination === 'style' || 
        /\.(js|css)$/i.test(url.pathname)) {
      return await staleWhileRevalidate(request, RUNTIME_CACHE);
    }
    
    // HTML pages - Network First with fallback
    if (request.destination === 'document' || request.mode === 'navigate') {
      return await networkFirst(request, RUNTIME_CACHE);
    }
    
    // Everything else - Network First
    return await networkFirst(request, RUNTIME_CACHE);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE);
      return await cache.match('/') || new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Cache First strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || await fetchPromise;
}

// Handle background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  try {
    // Sync any pending analytics data when online
    console.log('[SW] Syncing analytics data');
  } catch (error) {
    console.error('[SW] Analytics sync error:', error);
  }
}
