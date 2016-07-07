export function initialize(/* application */) {
  // if ('serviceWorker' in navigator) {
  //   const { serviceWorker } = navigator;
  //
  //   serviceWorker.register('/sw.js')
  //     .then(() => {
  //       console.info('`initializer:service-worker`, \`/sw-caching.js\` Registered!');
  //       // return serviceWorker.register('/sw-fetch.js');
  //     })
  //     // .then(() => {
  //     //   console.info('`initializer:service-worker`, \`/sw-fetch.js\` Registered!');
  //     // })
  //     .catch(err => {
  //       console.error(`\`initializer:service-worker\`, Error during registration: ${err}`);
  //     })
  //
  // } else {
  //   console.error('initializer:service-worker, ServiceWorker not supported');
  // }

}

export default {
  name: 'service-worker',
  initialize
};
