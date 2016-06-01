import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:unique-notebook-name', 'Unit | Validator | unique-notebook-name', {
  needs: ['validator:messages'],
});

test('it works', function(assert) {
  const validator = this.subject();
  assert.ok(validator);
});
