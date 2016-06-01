import Ember from 'ember';

function assertTrimmedText(app, assert, selector, text, errorMessage) {
  const elem = document.querySelector(selector);

  if (!elem) {
    throw new Error(`assertTrimmedText: element with selector ${selector} not found`);
  }

  const expected = text;
  const actual = document.querySelector(selector).textContent.trim();

  assert.equal(actual, expected, errorMessage);
}

Ember.Test.registerHelper('assertTrimmedText', assertTrimmedText);
