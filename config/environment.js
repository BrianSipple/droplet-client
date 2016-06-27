'use strict';

const SERVER_PORT = 4500;  // TODO: Store this in a better place


module.exports = function(environment) {

  const isProductionLikeBuild = ['production', 'staging'].indexOf(environment) > -1;

  const ENV = {
    modulePrefix: 'droplet',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      SERVER_PORT,

      // TODO: Refactor this structure to something a bit more intuitive
      apis: {
        droplet: {
          HOST: `http://localhost:${SERVER_PORT}`,
          NAMESPACE: 'api/v1'
        }
      }
    }
  };

  // Configuration of ember-simple-auth (http://ember-simple-auth.com/api/classes/Configuration.html)
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    guestRoute: 'homepage',
    routeAfterAuthentication: 'protected.dashboard',
    routeIfAlreadyAuthenticated: 'protected.notebooks',  // TODO: Currently this clashes with our routeAfterAuthentication
  };

  ENV['ember-devtools'] = {
    global: true,
    enabled: environment === 'development',
  };

  // disable this to use http-proxy instead of mirage/pretender
  ENV['ember-cli-mirage'] = {
    enabled: !isProductionLikeBuild,  // TODO: Figure out why this might break the broccoli sourcemapping build
  };

  ENV['ember-a11y-testing'] = {
    componentOptions: {}
  };


  ////////////// ENVIRONMENT-SPECIFIC SETTINGS TO OVERRIDE defaults ///////////////////
  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // Basic logging, e.g. "Transitioned into 'post'"
    ENV.APP.LOG_TRANSITIONS = true;

    // Extremely detailed logging, highlighting every internal
    // step made while transitioning into a route, including
    // `beforeModel`, `model`, and `afterModel` hooks, and
    // information about redirects and aborted transitions
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
  }


  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


  if (environment === 'production') {
    ENV.APP.apis.droplet.HOST = 'https://use-droplet.herokuapp.com';
  }

  return ENV;
};
