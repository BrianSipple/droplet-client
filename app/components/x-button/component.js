import Ember from 'ember';

const { Component, computed } = Ember;


export default Component.extend({
  attributeBindings: ['disabled', 'type'],
  tagName: 'button',
  classNameBindings: ['cornerStyleClass', 'tapTargetSizeClass', 'disabled::u-pointer'],

  classNames: [
    'c-button',
    'o-flex-grid',
    'o-flex-grid--full',
    'o-flex-grid--center',
    'u-relative'
  ],

  title: null,
  disabled: false,
  fab: false,
  size: null,
  cornerStyle: 'rounded',

  cornerStyleClass: computed('fab', 'cornerStyle', {
    get() {
      if (this.get('fab')) {
        return 'g-border-circle';
      }

      return {
        rounded: 'c-button--rounded',
        flat: 'c-button--flat'
      }[(this.get('cornerStyle') || '').toLowerCase()];
    }
  }),

  tapTargetSizeClass: computed('size', {
    get() {
      const size = this.get('size') || '';

      return {
        xsmall: 'o-tap-target-xs',
        small: 'o-tap-target-sm',
        medium: 'o-tap-target-md',
        large: 'o-tap-target-lg'
      }[size.toLowerCase()] || null;
    }
  })
});
