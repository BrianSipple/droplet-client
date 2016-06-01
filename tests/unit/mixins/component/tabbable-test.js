import Ember from 'ember';
import ComponentTabbableMixin from 'droplet/mixins/component/tabbable';
import { module, test } from 'qunit';

module('Unit | Mixin | component/tabbable');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentTabbableObject = Ember.Object.extend(ComponentTabbableMixin);
  const subject = ComponentTabbableObject.create();
  assert.ok(subject);
});
