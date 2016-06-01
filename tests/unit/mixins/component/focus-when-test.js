import Ember from 'ember';
import ComponentFocusWhenMixin from 'droplet/mixins/component/focus-when';
import { module, test } from 'qunit';

module('Unit | Mixin | component/focus when');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentFocusWhenObject = Ember.Object.extend(ComponentFocusWhenMixin);
  const subject = ComponentFocusWhenObject.create();
  assert.ok(subject);
});
