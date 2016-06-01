import Ember from 'ember';
import ComponentAriaAttributesMixin from 'droplet/mixins/component/aria-attributes';
import { module, test } from 'qunit';

module('Unit | Mixin | component/aria attributes');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentAriaAttributesObject = Ember.Object.extend(ComponentAriaAttributesMixin);
  const subject = ComponentAriaAttributesObject.create();
  assert.ok(subject);
});
