// Service Worker для Rahima Consulting PWA
const CACHE_NAME = 'rahima-consulting-v1';
const RUNTIME_CACHE = 'rahima-runtime-v1';

// Файлы для предварительного кеширования
const PRECACHE_URLS = [
  '/',
  '/services',
  '/solutions',
  '/ai-assistants',
  '/cases',
  '/contacts',
  '/calculator',
  '/offline',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Перехват fetch-запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем запросы к API и внешним ресурсам
  if (
    url.origin !== location.origin ||
    request.url.includes('/api/') ||
    request.url.includes('/_next/static/') ||
    request.method !== 'GET'
  ) {
    return;
  }

  // Стратегия: Network First, fallback to Cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Клонируем ответ
        const responseToCache = response.clone();
        
        // Сохраняем в runtime cache
        caches.open(RUNTIME_CACHE)
          .then((cache) => {
            cache.put(request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // Если сеть недоступна, пробуем достать из кеша
        return caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Если в кеше нет, показываем офлайн-страницу
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline');
            }
          });
      })
  );
});

// Push-уведомления
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Rahima Consulting';
  const options = {
    body: data.body || 'У вас новое уведомление',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'notification',
    data: data.url ? { url: data.url } : {},
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Клик по уведомлению
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

