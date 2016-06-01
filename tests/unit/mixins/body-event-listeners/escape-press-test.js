import Ember from 'ember';
import EscapePressMixin from 'droplet/mixins/body-event-listeners/escape-press';
import { module, test } from 'qunit';

module('Unit | Mixin | event actioners/escape key');

// Replace this with your real tests.
test('it works', function(assert) {
  const EscapePressObject = Ember.Object.extend(EscapePressMixin);
  const subject = EscapePressObject.create();
  assert.ok(subject);
});
