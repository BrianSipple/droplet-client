import Ember from 'ember';
import ComponentActionButtonMixin from 'droplet/mixins/component/press-action';
import { module, test } from 'qunit';

module('Unit | Mixin | component/action button');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentActionButtonObject = Ember.Object.extend(ComponentActionButtonMixin);
  const subject = ComponentActionButtonObject.create();
  assert.ok(subject);
});
