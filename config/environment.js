'use strict';

const setupEnvironmentSpecificSettings = require('./helpers/setup-environment-specific-settings');

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
          HOST: isProductionLikeBuild ?
            ``
            :
            `http://localhost`,
          URL_PREFIX: isProductionLikeBuild ?
            `` // TODO: try window.hostname
            :
            `http://localhost:${SERVER_PORT}`,
          BASE_URL: 'api/v1',
        },
      },
    },
  };

  // Configuration of ember-simple-auth (http://ember-simple-auth.com/api/classes/Configuration.html)
  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    guestRoute: 'homepage',
    routeAfterAuthentication: 'protected.dashboard',
    // routeIfAlreadyAuthenticated: 'protected.dashboard',
    routeIfAlreadyAuthenticated: 'protected.notebooks',
  };

  ENV['ember-devtools'] = {
    global: true,
    enabled: environment === 'development',
  };

  // disable this to use http-proxy instead of mirage/pretender
  ENV['ember-cli-mirage'] = {
    enabled: !isProductionLikeBuild,  // TODO: Figure out why this breaks the broccoli sourcemapping build
  };

  ENV['ember-a11y-testing'] = {
    componentOptions: {
      turnAuditOff: true
    }
  },

  setupEnvironmentSpecificSettings(ENV, environment);

  return ENV;
};
