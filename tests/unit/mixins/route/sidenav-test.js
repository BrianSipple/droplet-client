import Ember from 'ember';
import SidenavRouteMixin from 'droplet/mixins/route/sidenav';
import { module, test } from 'qunit';

module('Unit | Mixin | route/sidenav');

// Replace this with your real tests.
test('it works', function(assert) {
  const SidenavRoute = Ember.Object.extend(SidenavRouteMixin);
  const subject = SidenavRoute.create();
  assert.ok(subject);
});
