module.exports = {
  "env": {
    "es6": true,
    "browser": true
  },
  // "parser": "babel",
  "extends": [
    "./rules/best-practices.js",
    "./rules/errors.js",
    "./rules/es6.js",
    "./rules/node.js",
    "./rules/strict.js",
    "./rules/style.js",
    "./rules/variables.js",
    "./rules/babel-extensions.js"
  ],
  "plugins": [
    "babel"
  ]
};
