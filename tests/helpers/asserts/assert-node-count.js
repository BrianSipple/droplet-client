import Ember from 'ember';

function assertNodeCount(app, assert, selector, length, errorMessage) {
  const expected = length;
  const actual = document.querySelectorAll(selector).length;

  assert.equal(actual, expected, errorMessage);
}

Ember.Test.registerHelper('assertNodeCount', assertNodeCount);
