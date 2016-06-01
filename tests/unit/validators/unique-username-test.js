import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { Object: EmberObject, RSVP: { Promise } } = Ember;

const User = EmberObject.extend({
  username: 'google'
});

const StoreStub = EmberObject.extend({
  query: function (){}
});


let validator, storeStub, model, validation, message;

moduleFor('validator:unique-username', 'Unit | Validator | unique-username', {
  needs: [
    'validator:messages',
  ],

  beforeEach () {
    storeStub = StoreStub.create({ query: () => Promise.resolve(User.create()) });
    validator = this.subject({ store: storeStub });
  }
});



test('validates that a newly created user has a unique username', async function (assert) {
  const { username: newUserUsername } = User.create();

  validation = validator.validate(newUserUsername);

  assert.equal(validation instanceof Promise, true);

  message = await validation.then(resp => resp);
  assert.equal(message, `The username ${newUserUsername} already exists`);
});
