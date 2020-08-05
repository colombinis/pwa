const CACHE_NAME = 'v1_cache_sacsi_pwa';
const url2Cache = [
    './',
    './style.css',
    './script.js',
    './img/ico_150.png',
    './img/logo_sacsi_200_50.png',
];

self.addEventListener('install', (e) => {
    //add assets to cache
    console.log('sw-install', e);
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(url2Cache)
                    .then(() => {
                        self.skipWaiting()
                    });
            })
            .catch(err => { console.log('error en install', err); })
    )
});

self.addEventListener('activate', (e) => {
    //add resources to work offline
    console.log('sw-activate', e);

    const cacheWL = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.map(cN => {
                    if (cacheWL.indexOf(cN) === -1) {
                        return caches.delete(cN);
                    }
                })
            })
            .then(() => { self.clients.claim() })

    );

});

self.addEventListener('fetch', (e) => {
    //proxy 
    console.log('sw-fetch', e.request.url, 'completo', e);
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res
                }
                return mycacheAcum(e.request); //hace el request mediante fetch
            })
    );
});

function mycacheAcum(req) {
    // return fetch(req);

    // IMPORTANT: Clone the request. A request is a stream and
    // can only be consumed once. Since we are consuming this
    // once by cache and once by the browser for fetch, we need
    // to clone the response.
    var fetchRequest = req.clone();

    return fetch(fetchRequest).then(
        function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
                .then(function (cache) {
                    cache.put(req, responseToCache);
                });

            return response;
        }
    );
}