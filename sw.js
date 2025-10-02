const CACHE_NAME = 'card-advisor-v3';
const STATIC_CACHE_NAME = 'card-advisor-static-v3';
const DYNAMIC_CACHE_NAME = 'card-advisor-dynamic-v3';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/card-advisor-kz-pwa/',
  '/card-advisor-kz-pwa/index.html',
  '/card-advisor-kz-pwa/css/styles.css',
  '/card-advisor-kz-pwa/js/app.js',
  '/card-advisor-kz-pwa/js/data.js',
  '/card-advisor-kz-pwa/js/storage.js',
  '/card-advisor-kz-pwa/js/translations.js',
  '/card-advisor-kz-pwa/manifest.json',
  '/card-advisor-kz-pwa/icon.svg',
  '/card-advisor-kz-pwa/icons/icon-32x32.png',
  '/card-advisor-kz-pwa/icons/icon-192x192.png',
  '/card-advisor-kz-pwa/icons/icon-512x512.png',
  '/card-advisor-kz-pwa/icons/screenshot-narrow.svg',
  '/card-advisor-kz-pwa/icons/screenshot-wide.svg',
  '/card-advisor-kz-pwa/adaptive-card.json',
  '/card-advisor-kz-pwa/widget-data.json'
];

// Offline fallback page
const OFFLINE_PAGE = '/card-advisor-kz-pwa/index.html';

// Установка Service Worker
self.addEventListener('install', function(event) {
  console.log('[SW] Installing Service Worker v3');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(function() {
        console.log('[SW] All static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating Service Worker v3');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Delete old caches
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('[SW] Service Worker activated and old caches cleaned');
      return self.clients.claim();
    })
  );
});

// Enhanced fetch handler with network-first for API, cache-first for assets
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML pages: Cache-first with network fallback
    event.respondWith(handlePageRequest(request));
  } else if (request.destination === 'image' || 
             request.destination === 'script' || 
             request.destination === 'style' ||
             request.destination === 'font') {
    // Static assets: Cache-first
    event.respondWith(handleAssetRequest(request));
  } else {
    // API calls and other requests: Network-first
    event.respondWith(handleApiRequest(request));
  }
});

// Handle page requests (HTML)
async function handlePageRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving page from cache:', request.url);
      return cachedResponse;
    }

    // Try network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for page request:', error);
  }

  // Fallback to offline page
  const offlineResponse = await caches.match(OFFLINE_PAGE);
  return offlineResponse || new Response('Offline', { status: 503 });
}

// Handle static asset requests
async function handleAssetRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving asset from cache:', request.url);
      return cachedResponse;
    }

    // Try network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for asset request:', error);
  }

  // Return empty response for failed assets
  return new Response('', { status: 404 });
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for API request:', error);
  }

  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    console.log('[SW] Serving API response from cache:', request.url);
    return cachedResponse;
  }

  // Return offline indicator
  return new Response(JSON.stringify({ offline: true, error: 'Network unavailable' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Background Sync для offline функциональности
self.addEventListener('sync', function(event) {
  console.log('[SW] Background sync triggered');
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Здесь можно добавить логику синхронизации данных
      console.log('[SW] Background sync completed')
    );
  }
});

// Push notifications support
self.addEventListener('push', function(event) {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'Новые предложения по банковским картам!',
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-192x192.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Посмотреть предложения',
        icon: '/icons/icon-192x192.svg'
      },
      {
        action: 'close',
        title: 'Закрыть',
        icon: '/icons/icon-192x192.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Card Advisor KZ', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notification click received');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Просто закрываем уведомление
  } else {
    // Клик по самому уведомлению
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic Background Sync
self.addEventListener('periodicsync', function(event) {
  console.log('[SW] Periodic background sync triggered');
  if (event.tag === 'card-data-sync') {
    event.waitUntil(
      // Здесь можно обновить данные о картах
      console.log('[SW] Card data sync completed')
    );
  }
});