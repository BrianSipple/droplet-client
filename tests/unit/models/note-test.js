import { moduleForModel, test } from 'ember-qunit';
import assertModelRelationship from 'droplet/tests/helpers/models/assert-model-relationship';


moduleForModel('note', 'Unit | Model | note', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user',
    'model:notebook',
    'model:tag',
    'model:theme-color',
  ],
});


test('containing a `hasMany` relationship to `tags`', function (assert) {
  const noteModel = this.store().modelFor('note');
  assertModelRelationship(assert, noteModel, { key: 'tags', kind: 'hasMany', type: 'tag' });
});

test('containing a `hasMany` relationship to `collaborators`', function (assert) {
  const noteModel = this.store().modelFor('note');
  assertModelRelationship(assert, noteModel, { key: 'collaborators', kind: 'hasMany', type: 'user' });
});

test('containing a `belongsTo` relationship to `notebook`', function (assert) {
  const noteModel = this.store().modelFor('note');
  assertModelRelationship(assert, noteModel, { key: 'notebook', kind: 'belongsTo', type: 'notebook' });
});

test('containing a `belongsTo` relationship to `theme-color`', function (assert) {
  const noteModel = this.store().modelFor('note');
  assertModelRelationship(assert, noteModel, { key: 'activeThemeColor', kind: 'belongsTo', type: 'theme-color' });
});
