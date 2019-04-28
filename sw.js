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
        .then((cacheNames)=>{
            cacheNames.map(cN =>{
                if(cacheWL.indexOf(cN) ===-1){
                    return caches.delete(cN);
                }
            })
        })
        .then(() => {self.clients.claim()})
        
    );

});

self.addEventListener('fetch', (e) => {
    //proxy 
    console.log('sw-fetch', e);
    e.responseWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res
            }
            return fetch(e.request); //hace el request mediante fetch
        })
    );
});