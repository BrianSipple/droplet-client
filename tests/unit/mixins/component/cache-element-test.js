import Ember from 'ember';
import ComponentCacheElementMixin from 'droplet/mixins/component/cache-element';
import { module, test } from 'qunit';

module('Unit | Mixin | component/cache element');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentCacheElementObject = Ember.Object.extend(ComponentCacheElementMixin);
  const subject = ComponentCacheElementObject.create();
  assert.ok(subject);
});
