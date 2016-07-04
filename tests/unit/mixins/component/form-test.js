import Ember from 'ember';
import ComponentFormMixin from 'droplet/mixins/component/form';
import { module, test } from 'qunit';

module('Unit | Mixin | component/form');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentFormObject = Ember.Object.extend(ComponentFormMixin);
  const subject = ComponentFormObject.create();
  assert.ok(subject);
});
