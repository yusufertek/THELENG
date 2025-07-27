const CACHE_NAME = 'sonsuz-miras-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sitelogo.jpg',
  '/logo2.PNG'
  '/logo3.PNG'
  // Google AdSense scriptlerini cache'den çıkardık
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache addAll failed:', error);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Google AdSense ve dış kaynaklı scriptleri cache'leme
  if (event.request.url.includes('googlesyndication.com') || 
      event.request.url.includes('elevenlabs.io') ||
      event.request.url.includes('pagead2.googlesyndication.com')) {
    return; // Bu istekleri service worker ile işleme
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Network'ten getir
        return fetch(event.request).catch(() => {
          // Eğer network de başarısız olursa ve document ise ana sayfayı döndür
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'SONSUZ MİRAS\'tan yeni bir bildirim',
      icon: '/sitelogo.jpg',
      badge: '/sitelogo.jpg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'Keşfet',
          icon: '/sitelogo.jpg'
        },
        {
          action: 'close',
          title: 'Kapat'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'SONSUZ MİRAS', options)
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    return;
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync event
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  console.log('Background sync triggered');
}

// Message event
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
