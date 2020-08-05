const cacheName = 'cache-v1';
const resourcesToPrecache =[
    '/',
    'index.html',
    'assets/img/_1_1_.jpg',
];

self.addEventListener('install',event =>{
    console.log('evento install',cacheName);
    event.waitUntil(
        caches.open(cacheName)
        .then( cache =>{
            return cache.addAll(resourcesToPrecache)
        })
    );
});
self.addEventListener('activate',event =>{
    console.log('evento activate');
});

self.addEventListener('fetch',event =>{
    console.log('evento fetch ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then( cachedResponse =>{
            return cachedResponse || fetch(event.request)
        })
    );
});