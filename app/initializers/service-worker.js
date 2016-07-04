export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  if ('serviceWorker' in navigator) {
    debugger;
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        debugger;
        console.info('`initializer:service-worker`, Service Workers Registered!');
      })
      .catch(err => {
        console.error(`\`initializer:service-worker\`, Error while attempting\
          Service Worker registration: ${err}`
        );
      });

  } else {
    console.error('initializer:service-worker, ServiceWorker not supported');
  }

}

export default {
  name: 'service-worker',
  initialize
};
