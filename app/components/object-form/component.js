import Ember from 'ember';
import BufferedProxy from 'ember-buffered-proxy/proxy';

const {
  Component,
  K,
} = Ember;


export default Component.extend({

  tagName: 'form',
  classNames: ['c-object-form', 'c-form'],
  attributeBindings: ['autocomplete', 'novalidate', 'method'],

  autocomplete: 'on',
  novalidate: 'novalidate',
  method: 'post',
  onSubmit: null,
  onChange: null,
  submitText: 'Submit',

  /**
   * Pass a boolean that you'd like to mutate here if you'd
   * like to keep track of the form's dirty state
   */
  isDirty: false,

  startingValues: null,
  formValues: null,


  setStartingValues () {
    const startingValues = this.get('startingValues') || {};

    this.set('formValues', BufferedProxy.create({ content: startingValues }));
  },

  resetForm() {
    this.get('formValues').discardBufferedChanges();
    this.set('isDirty', false);
  },


  init () {
    this._super(...arguments);

    this.onSubmit = (typeof this.onSubmit === 'function') ? this.onSubmit : K;
  },

  didReceiveAttrs () {
    this._super(...arguments);

    this.setStartingValues();
  },


  change (/* event */) {
    const readFormValuesOnChange = this.get('readFormValuesOnChange');
    if (typeof readFormValuesOnChange === 'function') {
      readFormValuesOnChange(this.get('formValues'));
    }
  },

  submit (event) {
    event.preventDefault();
    const submissionValues = this.get('formValues.buffer');
    const { parse, stringify } = JSON;

    this.resetForm();
    this.get('onSubmit')(parse(stringify(submissionValues)));

    // NOTE: Explicit `Object` casting prevents errors when
    // consumers try to call toJSON on this return value
  },

});
