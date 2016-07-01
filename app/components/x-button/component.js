import Ember from 'ember';

const { Component, computed } = Ember;


export default Component.extend({
  attributeBindings: ['disabled', 'type'],
  tagName: 'button',
  classNameBindings: ['cornerStyleClass', 'disabled::u-pointer'],

  classNames: [
    'c-button',
    'o-flex-grid',
    'o-flex-grid--full',
    'o-flex-grid--center',
    'u-relative'
  ],

  title: null,
  disabled: false,
  size: null,
  cornerStyle: 'rounded',

  cornerStyleClass: computed('cornerStyle', {
    get() {
      return {
        rounded: 'c-button--rounded',
        flat: 'c-button--flat'
      }[(this.get('cornerStyle') || '').toLowerCase()];
    }
  })
});
