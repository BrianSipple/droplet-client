import Ember from 'ember';
import ComponentUnTabbableMixin from 'droplet/mixins/component/un-tabbable';
import { module, test } from 'qunit';

module('Unit | Mixin | component/un tabbable');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentUnTabbableObject = Ember.Object.extend(ComponentUnTabbableMixin);
  let subject = ComponentUnTabbableObject.create();
  assert.ok(subject);
});
