import Ember from 'ember';
import ComponentModalDialogMixin from 'droplet/mixins/component/modal-dialog';
import { module, test } from 'qunit';

module('Unit | Mixin | component/modal dialog');

// Replace this with your real tests.
test('it works', function(assert) {
  const ComponentModalDialogObject = Ember.Object.extend(ComponentModalDialogMixin);
  const subject = ComponentModalDialogObject.create();
  assert.ok(subject);
});
