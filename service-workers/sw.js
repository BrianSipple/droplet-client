const version = 'v1::'

const CACHE_ROUTES = {
  assets: [
    '/',
    '/assets/theme-artwork/flyout-background-polygons-01.png',
    '/assets/images/tomster.png'
  ]
};

self.addEventListener('install', function serviceWorkerInstaller(event) {
  debugger;
  console.log(`sw.js, \`install\` event, preparing to open caches`);
  event.waitUntil(
    caches
      .open(`${version}droplet-assets`)
      .then(function prefillArtwork(cache) {
        console.log(`sw.js, \`install\` event, cache open: ${cache}`);
        debugger;
        return cache.addAll(CACHE_ROUTES.assets);
      })
  );
});


self.addEventListener('activate', function activateServiceWorker(event) {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        debugger;
        return Promise.all(keys
          .filter(key => key.indexOf(version) !== 0)
          .map(outdatedVersionKey => caches.delete(outdatedVersionKey))
        );
      })
  );
});
