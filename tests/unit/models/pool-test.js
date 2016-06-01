import { moduleForModel, test } from 'ember-qunit';

moduleForModel('pool', 'Unit | Model | pool', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:notebook',
  ],
});

test('it exists', function(assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
