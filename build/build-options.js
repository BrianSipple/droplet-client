/* global module */

/**
* Plugin configuration for ember-cli-build.js
*/

'use strict';

const environment = process.env.EMBER_ENV;
const isProductionLikeBuild = ['production', 'staging'].indexOf(environment) > -1;
const isTesting = environment === 'test';

const opts = require('./_plugin-options');

const cssImport = require('postcss-import');
const cssCustomProperties = require('postcss-custom-properties');
const cssCSSVariables = require('postcss-css-variables');
const cssCustomMedia = require('postcss-custom-media');
const cssMediaVariables = require('postcss-media-variables');
const cssCalc = require('postcss-calc');
const cssWring = require('csswring');
const cssMQPacker = require('css-mqpacker');
const cssNext = require('postcss-cssnext');
const cssReporter = require('postcss-reporter');
const cssNested = require('postcss-nested');

const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

const MATCH_CSS = new RegExp('.*\\.css$');

// Round up our styles throughout the app and avail them to the "@import"
// mechanism that can be used in app/styles/app.css
const appCSS = new MergeTrees([

  // common component styles
  new Funnel('app/components', {
    srcDir: '/',
    destDir: 'components',
    include: [MATCH_CSS],
  }),

  // all other pods styles
  new Funnel('app/', {
    srcDir: '/',
    destDir: 'pods',
    exclude: ['styles/**/*', 'components/**/*', '_dev/**/*'],
    include: [MATCH_CSS],
  }),

  // "base" styles within the app/styles directory itself
  new Funnel('app/styles', {
    srcDir: '/',
    destDir: '.',
    include: [MATCH_CSS],
  })
]);

module.exports = {

  trees: {
    styles: appCSS   // expose this virtual tree (aka, virtual directory) to app.css during the build
  },

  babel: {
    includePolyfill: true
  },

  // 'ember-cli-qunit': {
  //   useLintTree: false
  // },
  //
  // hinting: !isTesting,

  /* Use PostCSS to create our CSS Processor! */
  postcssOptions: {
    plugins: [
      { module: cssImport },

      /* ----------- Ordering for Custom media query processing with calc'd variables ----------- */
      /* NOTE: abide by order defined here: https://github.com/WolfgangKluge/postcss-media-variables#usage) */
      { module: cssMediaVariables },
      { module: cssCSSVariables },
      { module: cssCustomMedia },
      {
        module: cssCustomProperties,
        options: opts.customProperties
      },
      { module: cssCalc },
      { module: cssMediaVariables },
      /* ----------- /end ordering for Custom media query processing ----------- */

      { module: cssNested },

      { module: cssNext },

      { module: cssMQPacker },

      // minify all the things!
      { module: cssWring },

      // report all the things!
      { module: cssReporter }
    ]
  },

  sourcemaps: {
    enabled: isProductionLikeBuild,
    extensions: ['js', 'css']
  },

  minifyCSS: { enabled: isProductionLikeBuild },
  minifyJS: { enabled: isProductionLikeBuild },

  svgstore: {
    excludeSourceFiles: true, // exclude all processed source files to prevent duplication when Ember-CLI-broccoli sends stuff in public to /dist (https://github.com/salsify/ember-cli-svgstore#usage)
    files: {
      sourceDirs: [ 'public/assets/icons' ],
      outputFile: '/assets/icons.svg'
    }
  }
};
