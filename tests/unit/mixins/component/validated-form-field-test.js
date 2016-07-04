import Ember from 'ember';
import ComponentValidatedFormFieldMixin from 'droplet/mixins/component/validated-form-field';
import { module, test } from 'qunit';

module('Unit | Mixin | component/validated form field');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentValidatedFormFieldObject = Ember.Object.extend(ComponentValidatedFormFieldMixin);
  const subject = ComponentValidatedFormFieldObject.create();
  assert.ok(subject);
});
