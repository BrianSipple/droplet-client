import Ember from 'ember';
import { initialize } from '../../../instance-initializers/log-errors';
import { module, test } from 'qunit';
import destroyApp from '../../helpers/destroy-app';
import startMirage from 'droplet/tests/helpers/start-mirage';

module('Unit | Instance Initializer | log errors', {
  beforeEach: function() {
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
      startMirage(this.appInstance);
    });
  },
  afterEach: function() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
