import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
// import assertModelHasAttr from 'droplet/tests/helpers/models/assert-model-has-attr';
import assertModelRelationship from 'droplet/tests/helpers/models/assert-model-relationship';
import startMirage from 'droplet/tests/helpers/start-mirage';

const { run, getOwner, isPresent } = Ember;

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: [
    // needed for setting up the application adapter
    'service:session',
    'adapter:application',

    'model:notebook',
    'model:tag',
    'model:user-private-info',
    'validator:presence',
    'validator:unique-username',
    'validator:length',
    'validator:confirmation',
    'transform:utc',
  ],

  beforeEach () {
    run(() => {
      startMirage(getOwner(this));
    });
  }
});


test('containing a `belongsTo` relationship to `user-private-info`', function (assert) {
  const userModel = this.store().modelFor('user');
  assertModelRelationship(assert, userModel, { key: 'userPrivateInfo', kind: 'belongsTo', type: 'user-private-info' });
});

test('containing a `hasMany` relationship to `notebooks`', function (assert) {
  const userModel = this.store().modelFor('user');
  assertModelRelationship(assert, userModel, { key: 'notebooks', kind: 'hasMany', type: 'notebook' });
});

test('containing a `hasMany` relationship to `tags`', function (assert) {
  const userModel = this.store().modelFor('user');
  assertModelRelationship(assert, userModel, { key: 'tags', kind: 'hasMany', type: 'tag' });
});


test('validating username', function (assert) {
  const user = this.subject();

  expected = true;
  actual = isPresent(user.get('validations.attrs.username'));
  message = 'user model should have a username validation';

  assert.equal(actual, expected, message);

  actual = isPresent(user.get('validations.attrs.username.options.presence'));
  message = 'user model should validate username presence';

  assert.equal(actual, expected, message);

  actual = isPresent(user.get('validations.attrs.username.options.unique-username'));
  message = 'user model should have a username uniqueness';

  assert.equal(actual, expected, message);
});
