import Ember from 'ember';
import ComponentHorizontalSlidingPanelMixin from 'droplet/mixins/component/horizontal-sliding-panel';
import { module, test } from 'qunit';

module('Unit | Mixin | component/horizontal sliding panel');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentHorizontalSlidingPanelObject = Ember.Object.extend(ComponentHorizontalSlidingPanelMixin);
  const subject = ComponentHorizontalSlidingPanelObject.create();
  assert.ok(subject);
});
