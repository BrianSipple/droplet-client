import { moduleForModel, test } from 'ember-qunit';

moduleForModel('recording', 'Unit | Model | recording', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  const model = this.subject();
  // const store = this.store();
  assert.ok(!!model);
});
