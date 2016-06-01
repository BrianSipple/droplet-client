import Ember from 'ember';

const { Component, K } = Ember;

/**
 * A component that toggles a background color for its content
 * by toggling its `isActive` property on click
 */
export default Component.extend({

  classNames: [
    'c-toggle-dot-indicator',
    'a-trans-ease-colorShift',
    'g-border-circle',
    'u-pointer',
  ],
  classNameBindings: ['isActive'],

  isActive: false,
  onActiveToggled: null,


  click (ev) {
    ev.stopPropagation();
    this.send('activeToggled');
  },


  init () {
    this._super(...arguments);

    this.onActiveToggled = (typeof this.onActiveToggled === 'function') ? this.onActiveToggled : K;
  },


  actions: {

    activeToggled () {
      this.toggleProperty('isActive');
      this.onActiveToggled(this.get('isActive'));
    },
  },
});
