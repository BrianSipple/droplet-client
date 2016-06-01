import Ember from 'ember';
import RegisterErrorReporterInitializer from '../../../initializers/register-error-reporter';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | register error reporter', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  },
});

// Replace this with your real tests.
test('it works', function(assert) {
  RegisterErrorReporterInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
