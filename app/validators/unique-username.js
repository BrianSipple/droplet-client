import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: { service },
  isEmpty,
} = Ember;

export default BaseValidator.extend({

  store: service(),

  validate(value /* options, model, attribute*/) {
    return this
      .get('store')
      .query('user', { username: value })
      .then(result => isEmpty(result) ? true : `The username ${value} already exists`);
  },
});
