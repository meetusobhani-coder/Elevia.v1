self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('elevia-cache').then(cache => {
      return cache.addAll([
        'index.html',
        'calculator.html',
        'style.css',
        'app.js',
        'logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});