'use strict';

module.exports = {
  "env": {
    "embertest": true
  },

  // overrides of our primary ESLint settings that are specifically targeted to
  // the Ember-CLI testing environment.
  "rules": {
    "arrow-spacing": 0,
    "comma-dangle": 0,
    "func-names": 0,
    "max-len": [1, 110, 2, {
      "ignoreComments": true,
      "ignoreUrls": true,
      "ignorePattern": "^moduleFor\(\?\:Component)\?\\(.*"   // `moduleFor[Component]` can generate lengthy, but still highly usefull names/descriptions
    }],
    "object-shorthand": 0,
    "newline-after-var": 0,
    "no-console": 0,
    "no-invalid-this": 0,
    "no-undef": 0,  /* TODO: Stay tuned for more robust whitelisting options */
    "object-curly-spacing": [2, "always"],
    "prefer-arrow-callback": 0,
    "prefer-reflect": 0,
    "space-before-function-paren": [0, { "anonymous": "always", "named": "always" }],

  }
};
