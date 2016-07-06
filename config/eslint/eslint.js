const path = require('path');

module.exports = {
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    path.join(__dirname, 'rules/best-practices.js'),
    path.join(__dirname, 'rules/errors.js'),
    path.join(__dirname, 'rules/es6.js'),
    // path.join(__dirname, 'rules/node.js'),  // TODO: Determine whether node rules are appropriate for client app -- atm, I think no
    path.join(__dirname, 'rules/strict.js'),
    path.join(__dirname, 'rules/style.js'),
    path.join(__dirname, 'rules/variables.js')
    //path.join(__dirname, 'rules/babel-extensions.js')
  ]
  // plugins: [
  //   "babel"
  // ]
};
