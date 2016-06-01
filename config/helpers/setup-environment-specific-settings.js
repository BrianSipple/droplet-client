'use strict';


/**
* Sets environment-specifc settings on the Ember `ENV` object -- according to
* the NODE_ENV value set on `environment`
*/
module.exports = function setupEnvironmentSpecificSettings (ENV, environment) {

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

    //ENV.APIS.app.hostName = '<pathToProductionAPIHost>';
  }
};
