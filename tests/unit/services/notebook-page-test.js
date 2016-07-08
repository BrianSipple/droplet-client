import { moduleFor } from 'ember-qunit';
import test from 'droplet/tests/ember-sinon-qunit/test';

moduleFor('service:notebook-page', 'Unit | Service | Notebook Page', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    this.notes = [
      { title: 'Sounders', body: 'Starting 11' },
      { title: 'Seahawks', body: 'Schedule' }
    ];
  }
});

// Replace this with your real tests.
test('filterNotesFromSearchInput', function(assert) {
  const service = this.subject();
  assert.ok(service, 'it exists!');
});
