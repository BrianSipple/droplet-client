import { moduleForModel, test } from 'ember-qunit';

moduleForModel('notebook', 'Unit | Serializer | notebook', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:notebook',
    'model:user',
    'model:note',
    'model:tag',
    'transform:utc',
    'transform:array',
  ],

});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  const record = this.subject();

  const serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
