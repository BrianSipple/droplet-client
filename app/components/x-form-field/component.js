import Ember from 'ember';
import uuid from 'ember-simple-uuid';

const {
  Component,
  computed
} = Ember;

/**
 * Form field that generates a unique id for its field
 */
export default Component.extend({

  tagName: 'p',
  classNames: ['c-form-field'],

  for: null,

  /**
   * Generate a uuid for the id (but shorten it just a bit)
   */
  fieldId: computed('id', function fieldId() {
    let uniqueId = uuid();
    uniqueId = uniqueId.replace(/\-/g, '').slice(Math.floor(uniqueId.length / 2));

    return `${this.get('for')}-${uniqueId}`;
  })

});
