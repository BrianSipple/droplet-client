(function cachingServiceWorker() {

  importScripts('sw-toolbox.js');  // imports the `toolbox` from sw-toolbox

  const CURRENT_VERSION = toolbox.options.cache.name = 'v1';
  const MYSTERY_MAN_AVATAR_URL = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y';
  const OFFLINE_PAGE_PATH = '/offline/';
  const OFFLINE_IMAGE_PATH = '/offline/offline-image.svg';  // TODO: Make this

  const STATIC_CACHE_PATHS = [
    '/',
    OFFLINE_PAGE_PATH,
    '/assets/droplet.css',
    '/assets/droplet.js',
    '/assets/vendor.css',
    '/assets/vendor.js',
    '/assets/theme-artwork/flyout-background-polygons-01.png',
    '/assets/images/tomster.png',
    MYSTERY_MAN_AVATAR_URL
  ];

  const RESOURCE_TYPES = {
    CONTENT: 'content',
    IMAGE: 'image',
    STATIC: 'static'
  };

  // Prefixes to ignore when trying to match the cache. TODO: Determine what's really needed here
  const ignoredPrefixes = [
    'api',
    'bf',
    's'
  ];

  const cachedPathPrefixes = [
    'about',
    'assets'
  ];

  // const networkFirstPrefixes = [
  //   'notes',
  //   'notebooks',
  //   'users',
  //   'tags'
  // ];
  //
  // const networkFirstSuffixes = [
  //   // 'review',
  //   'edit',
  //   'new'
  //   // 'last',
  //   // 'first',
  //   // 'random'
  // ];

  const IGNORED_PREFIX_PATTERN = new RegExp(`^\/(${ignoredPrefixes.join('|')})(\/|$)`, 'i');
  const CACHED_PATH_PATTERN = new RegExp(`^\/(?:(?:${cachedPathPrefixes.join('|')})\/(?:.+)?)?$`, 'i');
  // const FETCH_FIRST_PREFIX_PATTERN = new RegExp(`^\/(${networkFirstPrefixes.join('|')})(\/|$)`, 'i');
  // const FETCH_FIRST_SUFFIX_PATTERN = new RegExp(`^\/(${networkFirstSuffixes.join('|')})($)`, 'i');

  function getResourceTypeFromHeader(header) {
    if (header.indexOf('text/html') !== -1) {
      return RESOURCE_TYPES.CONTENT;
    }
    if (header.indexOf('image') !== -1) {
      return RESOURCE_TYPES.IMAGE;
    }

    return RESOURCE_TYPES.STATIC;
  }

  function shouldHandleFetch(event) {
    const request = event.request;
    const url = new URL(request.url);

    const criteria = {
      isGETRequest: request.method === 'GET',
      matchesCachePattern: CACHED_PATH_PATTERN.test(url.pathname),
      doesntMatchIgnoredPrefixPattern: !IGNORED_PREFIX_PATTERN.test(url.pathname),
      isFromMyOrigin: url.origin === self.location.origin
    };
    debugger;
    return Object.keys(criteria).every(key => !!(criteria[key]));
  }


  function addToCache(cacheKey, request, response) {
    if (response.ok) {
      const responseCopy = response.clone();
      caches.open(`${CURRENT_VERSION}::${cacheKey}`).then(cache => {
        cache.put(request, responseCopy);
      });
    }
    return response;
  }

  function fetchFromCache(event) {
    return caches.match(event.request).then(response => {
      if (!respones) {
        throw new Error(`${event.request.url} not found in cache`);
      }
      return response;
    });
  }

  function issueOfflineResponse(resourceType, url) {
    if (resourceType === RESOURCE_TYPES.IMAGE) {
      if (url.host === 'www.gravatar.com') {
        return caches.match(MYSTERY_MAN_AVATAR_URL);
      }
      // TODO: Make offline image
      return new Response(OFFLINE_IMAGE_PATH, {
        headers: { 'Content-Type': 'image/svg+xml' }
      });

    } else if (resourceType === RESOURCE_TYPES.CONTENT) {
      return caches.match(OFFLINE_PAGE_PATH);
    }
  }

  function setupPrefetching() {
    STATIC_CACHE_PATHS.forEach(url => {
      toolbox.router.any(url, toolbox.fastest);
    });

    toolbox.precache(STATIC_CACHE_PATHS);
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
          return cache.addAll(STATIC_CACHE_PATHS);
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

    function handleFetch(event) {
      const request = event.request;
      const url = request.url;
      const acceptHeader = request.headers.get('Accept');
      const resourceType = getResourceTypeFromHeader(acceptHeader);

      const cacheKey = resourceType;

      if (resourceType === RESOURCE_TYPES.CONTENT) {
        // network first
        event.respondWith(
          fetch(request)
            .then(response => addToCache(cacheKey, request, response))
            .catch(() => fetchFromCache(event))
            .catch(() => issueOfflineResponse(resourceType, url))
        );
      } else {
        // cache first
        event.respondWith(
          fetchFromCache(event)
            .catch(() => fetch(request))
              .then(response => addToCache(cacheKey, request, response))
            .catch(() => issueOfflineResponse(resourceType, url))
        );
      }

    }

    if (shouldHandleFetch(event)) {
      handleFetch(event);
    } else {
      event.respondWith(fetch(event.request));
      return;
    }








    // always go to the network for non-GET requests.
    // if (_request.method !== 'GET') {
    //   event.respondWith(fetch(_request));
    //   return;
    // }

    // const url = new URL(_request.url);
    // const isSameOrigin = url.origin === location.origin;
    //
    // if (isSameOrigin && IGNORED_PREFIX_PATTERN.test(url.pathname)) {
    //   return;
    // }

    // if (isSameOrigin && (
    //     FETCH_FIRST_PREFIX_PATTERN.test(url.pathname) ||
    //     FETCH_FIRST_SUFFIX_PATTERN.test(url.pathname)
    // )) {
    //   event.respondWith(caches.match(_request).then(fetchThenCacheOnMatch));
    // }

    // example of something we might want to ignore.....
    // if (request.url.indexOf('https://maps.googleapis.com/maps/vt') === 0) {
    //   return;
    // }

    // event.respondWith(caches.match(_request).then(cacheThenFetchOnMatch));
    //
    // function fetchThenCacheOnMatch(cacheMatchResult) {
    //   respondAfterCacheMatch(cacheMatchResult, true)
    // }
    //
    // function cacheThenFetchOnMatch(cacheMatchResult) {
    //   respondAfterCacheMatch(cacheMatchResult, false);
    // }


    /**
     * Receives cached responses, if any from attempting to cache match a request
     * Then makes a fetch request regardless of the cache
     * getting a hit.
     *
     * We also try to fall back gracefully when either fetch or
     * caching fail, with a `handleInabilityToResolve` callback
     */
    // function respondAfterCacheMatch(cacheMatchResult, shouldFetchFirst) {
    //   const networked = fetch(_request)
    //     .then(handleFetchFromNetwork, handleInabilityToResolve)
    //     .catch(handleInabilityToResolve);
    //
    //   if (shouldFetchFirst) {
    //     return networked;
    //   }
      //
      // return cacheMatchResult || networked;

      //
      // function handleFetchFromNetwork(response) {
      //   const clonedResponse = response.clone();
      //   caches
      //     .open(`${CURRENT_VERSION}::pages`)
      //     .then(cache => {
      //       cache.put(_request, clonedResponse);
      //       relay(response, cache);
      //     });
      //
      //   return clonedResponse;
      // }

      // function relay(response, cache) {
      //   const queryParams = url.search.slice(1);
      //   const isJSON = _responseMatchesType(response, 'application/json');
      //   const shouldNotify = cacheMatchResult && isSameOrigin;
      //
      //   if (!shouldNotify) return;
      //
      //   if (isJSON) {
      //     relayJSON();
      //   }
      //
      //   function relayJSON() {
      //     // TODO: Implement behavior for this
      //   }
      // }

    //   function handleInabilityToResolve() {
    //     if (shouldFetchFirst && cacheMatchResult) {
    //       return cacheMatchResult;
    //     }
    //
    //     const accepts = _request.headers.get('Accept');
    //     if ( isSameOrigin && accepts.indexOf('application/json') !== -1 ) {
    //       return renderOfflineView();
    //     }
    //   }
    //
    //   if (accepts.indexOf('image') !== -1) {
    //     if (url.host === 'www.gravatar.com') {
    //       return caches.match(MYSTERY_MAN_AVATAR_URL);
    //     }
    //   }
    //
    //   if (sameorigin) {
    //     return caches.match('/offline/');
    //   }
    //   return issueOfflineResponse();
    // }
  }

  // function _responseMatchesType(response, type) {
  //   const contentType = response.headers.get('Content-Type');
  //   return contentType && contentType.indexOf(type) !== -1;
  // }


  // function issueOfflineResponse() {
  //   return new Response('', { status: 503, statusText: 'Service Unavailable' });
  // }

  // function renderOfflineView() {
  //   const viewModel = { model: { action: 'error/offline' } };
  //   const options = {
  //     status: 200,
  //     headers: new Headers({ 'content-type': 'application/json' })
  //   };
  //
  //   return new Response(JSON.stringify(viewModel), options);
  // }


  ///////// Let's get started /////////
  setupPrefetching();
  self.addEventListener('install', installer);
  self.addEventListener('activate', activator);
  self.addEventListener('fetch', fetcher);
}());
