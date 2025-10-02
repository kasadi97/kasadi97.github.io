const CACHE_NAME = 'card-advisor-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/data.js',
  '/js/storage.js',
  '/js/translations.js',
  '/manifest.json',
  '/icon.svg',
  '/icons/icon-32x32.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/screenshot-narrow.svg',
  '/icons/screenshot-wide.svg',
  '/icons/freedom-l.png'
];

// Установка Service Worker
self.addEventListener('install', function(event) {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('[SW] Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('[SW] Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Обработка запросов (Cache First Strategy)
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем кэшированную версию если она есть
        if (response) {
          console.log('[SW] Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('[SW] Fetching from network:', event.request.url);
        return fetch(event.request).then(function(response) {
          // Проверяем, что получили валидный ответ
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Клонируем ответ для кэширования
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(function() {
          // Если сеть недоступна, возвращаем офлайн страницу
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      }
    )
  );
});

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