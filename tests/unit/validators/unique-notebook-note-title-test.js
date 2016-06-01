import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-notebook-note-title', 'Unit | Validator | unique-notebook-note-title', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  const validator = this.subject();
  assert.ok(validator);
});
