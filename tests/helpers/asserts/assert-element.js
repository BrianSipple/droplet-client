import Ember from 'ember';

function assertElement(app, assert, selector, errorMessage) {
  const expected = true;
  const actual = !!document.querySelector(selector);

  assert.equal(actual, expected, errorMessage);
}

Ember.Test.registerHelper('assertElement', assertElement);
