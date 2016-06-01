import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const {
  inject: { service },
  isEmpty,
} = Ember;

export default BaseValidator.extend({

  store: service(),

  validate(value /* , options, model, attribute */) {
    return this.get('store').query('notebook', { title: value }).then(result => {
      debugger;
      return isEmpty(result) ? true : `A notebook with a tile of ${value} already exists.`;
    });
  },
});
