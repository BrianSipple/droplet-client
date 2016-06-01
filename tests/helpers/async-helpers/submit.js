import Ember from 'ember';

/**
 * Tiny `submit` triggering helper to make `submit` triggering more expressive
 */
function submit (app, selector) {
  debugger;
  return triggerEvent(selector, 'submit');
}

Ember.Test.registerAsyncHelper('submit', submit);
