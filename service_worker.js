const cacheName  = 'v1'; 
const RUNTIME = 3000; // A list of local resources we always want to be cached. 
const cacheFiles = [ 
  './index.html', 
  './', // Alias for index.html 
  './css/main.css', 
  './main.js',
  './Data.json'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Installed');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
    //console.log('[ServiceWorker] Caching cacheFiles');
    return cache.addAll(cacheFiles);
    })
); 
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activated');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          //console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
        return caches.delete(thisCacheName);
      }
    }));
  })
); 
});
  self.addEventListener('fetch', function(e) {
    //console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      // Check in cache for the request being made
      caches.match(e.request)
        .then(function(response) {
          if ( response ) {
            console.log("[ServiceWorker] Found in Cache", e.request.url, response);
            // Return the cached version
            return response;
          }
          return fetch(e.request).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  cache.put(e.request,  response.clone());
                  });
              return response;
              }
            );
        })
      );
});