export function initialize(/* application */) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
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
