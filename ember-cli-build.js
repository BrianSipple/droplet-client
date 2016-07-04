'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const buildOptions = require('./build/build-options');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

/**
 * Place service-worker files at the root of the application files.
 * THIS IS CRITICAL --  a service worker must exist at the root of the
 * scope that we intend it to control, or higher.
 */
const serviceWorkerAppFiles = new Funnel('service-workers', {
  srcDir: '/',
  destDir: '/',
  include: ['**/*.js']
});

const serviceWorkerToolbox = new Funnel('bower_components/sw-toolbox', {
  srcDir: '/',
  destDir: '/',
  include: ['sw-toolbox.js']
});


module.exports = function(defaults) {
  const app = new EmberApp(defaults, buildOptions);

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('vendor/savvy/savvy.min.css');

  return app.toTree(new MergeTrees([serviceWorkerAppFiles, serviceWorkerToolbox]));
};
