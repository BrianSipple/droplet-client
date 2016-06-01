import Ember from 'ember';
import ComponentAnimationPrefixMixin from 'droplet/mixins/component/animation-prefix';
import { module, test } from 'qunit';

module('Unit | Mixin | component/animation prefix');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentAnimationPrefixObject = Ember.Object.extend(ComponentAnimationPrefixMixin);
  const subject = ComponentAnimationPrefixObject.create();
  assert.ok(subject);
});
