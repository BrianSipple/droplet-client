import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user-private-info', 'Unit | Model | user private info', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
  ],
});

test('it exists', function(assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
