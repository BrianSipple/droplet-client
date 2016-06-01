import Ember from 'ember';
import ComponentFormModalMixin from 'droplet/mixins/component/form-modal';
import { module, test } from 'qunit';

module('Unit | Mixin | component/form modal');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentFormModalObject = Ember.Object.extend(ComponentFormModalMixin);
  const subject = ComponentFormModalObject.create();
  assert.ok(subject);
});
