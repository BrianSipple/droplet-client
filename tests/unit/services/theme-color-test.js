import { moduleFor, test } from 'ember-qunit';

moduleFor('service:theme-color', 'Unit | Service | theme-color', {
  // Specify the other units that are required for this test.
  needs: ['model:theme-color']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  const service = this.subject();
  assert.ok(service);
});
