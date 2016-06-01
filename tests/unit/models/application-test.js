import { module, test } from 'qunit';
import ApplicationModelObject from 'droplet/models/application';

module('application', 'Unit | Model | application');

let model;

test('it exists', function(assert) {
  model = ApplicationModelObject.create();
  assert.ok(!!model);
});
