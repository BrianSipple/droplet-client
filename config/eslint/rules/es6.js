"use strict";

module.exports = {

  "env": {
    // Enables all ECMAScript 6 features except for modules.
    "es6": false
  },

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "arrowFunctions": true,
      "binaryLiterals": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": false,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": false,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "regexUFlag": true,
      "regexYFlag": true,
      "restParams": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      "unicodeCodePointEscapes": true,
      "globalReturn": true,
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },

  "rules": {

    // require braces in arrow function body
    "arrow-body-style": [2, "as-needed"],

    // require parens in arrow function arguments (see also: "no-confusing-arrow")
    "arrow-parens": [0, "as-needed"],

    // require space before/after arrow function's arrow
    "arrow-spacing": [2, { "before": true, "after": true }],

    // verify super() callings in constructors
    "constructor-super": 2,

    // enforce the spacing around the * in generator functions
    // "generator-star-spacing": [2, {"before": true, "after": false}], // NOTE: Disabled until this can be used without the babel-plugin

    // disallow arrow functions where a condition is expected
    // "no-confusing-arrow": 2,  // TODO: Use with ESLint 2.0+

    // disallow use of constant expressions in conditions
    "no-constant-condition": 2,

    // disallow modifying variables of class declarations
    "no-class-assign": 2,

    // disallow modifying variables that are declared using const
    "no-const-assign": 2,

    // disallow duplicate name in class members
    "no-dupe-class-members": 2,

    // disallow to use this/super before super() calling in constructors.
    "no-this-before-super": 2,

    // require let or const instead of var
    "no-var": 2,

    // require method and property shorthand syntax for object literals
    "object-shorthand": 2,

    // suggest using arrow functions as callbacks
    "prefer-arrow-callback": 2,

    // suggest using of const declaration for variables that are never modified after declared
    "prefer-const": 2,

    // suggest using Reflect methods where applicable
    "prefer-reflect": 0,

    // NOTE: Currently this rule warns even when "arguments" keyword is used with the spread operator (...arguments),
    // which is a prevalent Ember pattern
    "prefer-rest-params": 0,

    // suggest using the spread operator instead of .apply()
    "prefer-spread": 2,

    // suggest using template literals instead of strings concatenation
    "prefer-template": 1,

    // disallow generator functions that do not have yield
    "require-yield": 2
  }
};
