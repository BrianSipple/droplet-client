import Ember from 'ember';
import uuid from 'ember-simple-uuid';

const {
  Component,
  computed,
  set,
} = Ember;

const { alias } = computed;


export default Component.extend({

  tagName: 'section',
  classNames: ['c-form__field-block'],

  /* The propery on the model that the value will correspond to */
  for: null,
  value: null,

  /**
   * Generate a uuid for the id (but shorten it just a bit)
   */
  fieldId: computed('id', function fieldId() {
    let uniqueId = uuid();
    uniqueId = uniqueId.replace(/\-/g, '').slice(Math.floor(uniqueId.length / 2));

    return `${this.get('for')}-${uniqueId}`;
  }),

  fieldErrors: alias('value.errors'),

});
