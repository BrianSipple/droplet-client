import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: { service },
  isEmpty,
  isBlank
} = Ember;

export default BaseValidator.extend({

  store: service(),

  validate(value /* , options, model, attribute */) {
    if (isBlank(value)) {
      return true;
    }

    return this
      .get('store')
      .query('notebook', { title: value })
      .then(result => isEmpty(result) ? true : `A notebook with a tile of ${value} already exists.`);
  }
});
