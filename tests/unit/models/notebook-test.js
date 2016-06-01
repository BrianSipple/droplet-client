import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import assertModelRelationship from 'droplet/tests/helpers/models/assert-model-relationship';

const { run } = Ember;
const { floor, random } = Math;


let actual, expected;

moduleForModel('notebook', 'Unit | Model | notebook', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:note',
    'model:tag',
    'model:theme-color',
  ],
});


test('counting the number of notes', function(assert) {

  const notebook = this.subject({
    title: 'Seattle',
  });

  expected = floor(random() * (20 - 1) + 1);

  run(() => {
    for (let i = 0; i < expected; i++) {
      notebook.get('notes').addObject(this.store().createRecord('note', {
        title: `Cafe ${i}`,
      }));
    }
  });

  actual = notebook.get('noteCount');
  assert.equal(actual, expected);
});

test('containing a `hasMany` relationship to `notes`', function (assert) {
  const notebookModel = this.store().modelFor('notebook');
  assertModelRelationship(assert, notebookModel, { key: 'notes', kind: 'hasMany', type: 'note' });
});

test('containing a `hasMany` relationship to `collaborators`', function (assert) {
  const notebookModel = this.store().modelFor('notebook');
  assertModelRelationship(assert, notebookModel, { key: 'collaborators', kind: 'hasMany', type: 'user' });
});

test('containing a `belongsTo` relationship to `owner`', function (assert) {
  const notebookModel = this.store().modelFor('notebook');
  assertModelRelationship(assert, notebookModel, { key: 'owner', kind: 'belongsTo', type: 'user' });
});
