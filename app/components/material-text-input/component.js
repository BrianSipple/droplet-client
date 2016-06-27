import Ember from 'ember';

const { Component } = Ember;

/**
 * TODO: Try extending x-text-input component
 */
export default Component.extend({
  tagName: 'span',
  classNames: ['c-material-text-input', 'u-block', 'u-relative'],

  errors: null,
  fieldId: null,
  value: null,
  label: null,
  placeholder: null,

  labelClassNames: null,
  inputClassNames: null

});
