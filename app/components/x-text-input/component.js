import Ember from 'ember';

const { Component, computed } = Ember;


export default Component.extend({
  tagName: 'span',
  classNames: ['c-text-input', 'u-block', 'u-relative'],

  inputClassNames: null,
  labelClassNames: null,
  fieldId: null,
  value: null,
  label: null,
  placeholder: null,

  _inputClassNames: computed('inputClassNames', {
    get() {
      return (this.get('inputClassNames') || '').concat([
        'c-text-input__input',
        'u-b-box',
        'g-font-larger',
        'u-fill-width',
        'u-fill-height',
        'o-widget-box'
      ].join(' '));
    }
  }),

  _labelClassNames: computed('labelClassNames', {
    get() {
      return (this.get('labelClassNames') || '').concat([
        'c-text-input__label',
        'u-block',
        'g-font-700',
        'g-inherit'
      ].join(' '));
    }
  })
});
