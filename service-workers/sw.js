(function cachingServiceWorker() {

  importScripts('sw-toolbox.js');  // imports the `toolbox` from sw-toolbox

  const CURRENT_VERSION = toolbox.options.cache.name = 'v1';
  const MYSTERY_MAN_AVATAR_URL = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y';

  const URLS = {
    prefetch: [
      '/',
      '/assets/droplet.css',
      '/assets/droplet.js',
      '/assets/vendor.css',
      '/assets/vendor.js',
      '/offline',
      '/assets/theme-artwork/flyout-background-polygons-01.png',
      '/assets/images/tomster.png',
      MYSTERY_MAN_AVATAR_URL
    ]
  };

  // Prefixes to ignore when trying to match the cache. TODO: Determine what's really needed here
  const ignoredPrefixes = [
    'api',
    'bf',
    's'
  ];

  const fetchFirstPrefixes = [
    'notes',
    'notebooks',
    'users',
    'tags'
  ];

  const fetchFirstSuffixes = [
    // 'review',
    'edit',
    'new'
    // 'last',
    // 'first',
    // 'random'
  ];

  const IGNORED_PREFIX_PATTERN = new RegExp(`^\/(${ignoredPrefixes.join('|')})(\/|$)`, 'i');
  const FETCH_FIRST_PREFIX_PATTERN = new RegExp(`^\/(${fetchFirstPrefixes.join('|')})(\/|$)`, 'i');
  const FETCH_FIRST_SUFFIX_PATTERN = new RegExp(`^\/(${fetchFirstSuffixes.join('|')})($)`, 'i');


  ///////// Let's get started /////////
  setupPrefetching();
  self.addEventListener('install', installer);
  self.addEventListener('activate', activator);
  self.addEventListener('fetch', fetcher);

  function setupPrefetching() {
    const { prefetch: urlsToPrefetch } = URLS;

    urlsToPrefetch.forEach(url => {
      toolbox.router.any(url, toolbox.fastest);
    });

    toolbox.precache(urlsToPrefetch);
  }


  function installer(event) {
    debugger;
    console.log(`sw.js, \`install\` event, preparing to open caches`);
    event.waitUntil(
      caches
        .open(`${CURRENT_VERSION}::droplet-assets`)
        .then(function prefillArtwork(cache) {
          console.log(`sw.js, \`install\` event, cache open: ${cache}`);
          debugger;
          return cache.addAll(URLS.prefetch);
        })
    );
  }

  function activator(event) {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => {
          debugger;
          return Promise.all(keys
            .filter(key => key.indexOf(CURRENT_VERSION) !== 0)
            .map(outdatedVersionKey => caches.delete(outdatedVersionKey))
          );
        })
    );
  }

  function fetcher(event) {
    console.info('sw.js: fetch interception');
    debugger;
    const _request = event.request;

    // always go to the network for non-GET requests.
    if (_request.method !== 'GET') {
      event.respondWith(fetch(_request));
      return;
    }

    const url = new URL(_request.url);
    const isSameOrigin = url.origin === location.origin;

    if (isSameOrigin && IGNORED_PREFIX_PATTERN.test(url.pathname)) {
      return;
    }

    if (isSameOrigin && (
        FETCH_FIRST_PREFIX_PATTERN.test(url.pathname) ||
        FETCH_FIRST_SUFFIX_PATTERN.test(url.pathname)
    )) {
      event.respondWith(caches.match(_request).then(fetchThenCacheOnMatch));
    }

    // example of something we might want to ignore.....
    // if (request.url.indexOf('https://maps.googleapis.com/maps/vt') === 0) {
    //   return;
    // }

    event.respondWith(caches.match(_request).then(cacheThenFetchOnMatch));

    function fetchThenCacheOnMatch(cacheMatchResult) {
      respondAfterCacheMatch(cacheMatchResult, true)
    }

    function cacheThenFetchOnMatch(cacheMatchResult) {
      respondAfterCacheMatch(cacheMatchResult, false);
    }


    /**
     * Receives cached responses, if any from attempting to cache match a request
     * Then makes a fetch request regardless of the cache
     * getting a hit.
     *
     * We also try to fall back gracefully when either fetch or
     * caching fail, with a `handleInabilityToResolve` callback
     */
    function respondAfterCacheMatch(cacheMatchResult, shouldFetchFirst) {
      const networked = fetch(_request)
        .then(handleFetchFromNetwork, handleInabilityToResolve)
        .catch(handleInabilityToResolve);

      if (shouldFetchFirst) {
        return networked;
      }

      return cacheMatchResult || networked;


      function handleFetchFromNetwork(response) {
        const clonedResponse = response.clone();
        caches
          .open(`${CURRENT_VERSION}::pages`)
          .then(cache => {
            cache.put(_request, clonedResponse);
            relay(response, cache);
          });

        return clonedResponse;
      }

      function relay(response, cache) {
        const queryParams = url.search.slice(1);
        const isJSON = _responseMatchesType(response, 'application/json');
        const shouldNotify = cacheMatchResult && isSameOrigin;

        if (!shouldNotify) return;

        if (isJSON) {
          relayJSON();
        }

        function relayJSON() {
          // TODO: Implement behavior for this
        }
      }

      function handleInabilityToResolve() {
        if (shouldFetchFirst && cacheMatchResult) {
          return cacheMatchResult;
        }

        const accepts = _request.headers.get('Accept');
        if ( isSameOrigin && accepts.indexOf('application/json') !== -1 ) {
          return renderOfflineView();
        }
      }

      if (accepts.indexOf('image') !== -1) {
        if (url.host === 'www.gravatar.com') {
          return caches.match(MYSTERY_MAN_AVATAR_URL);
        }
      }

      if (sameorigin) {
        return caches.match('/offline/');
      }
      return issueOfflineResponse();
    }
  }

  function _responseMatchesType(response, type) {
    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.indexOf(type) !== -1;
  }


  function issueOfflineResponse() {
    return new Response('', { status: 503, statusText: 'Service Unavailable' });
  }

  function renderOfflineView() {
    const viewModel = { model: { action: 'error/offline' } };
    const options = {
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' })
    };

    return new Response(JSON.stringify(viewModel), options);
  }



}());
