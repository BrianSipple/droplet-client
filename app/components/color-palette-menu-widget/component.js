import Ember from 'ember';
import FocusableMixin from 'droplet/mixins/component/focus-when';

const { Component, K } = Ember;
const KEYCODE_ENTER = 13;  // TODO: Make a set of keyboard constants


export default Component.extend(FocusableMixin, {

  tagName: 'ul',
  attributeBindings: ['tabindex'],
  classNames: [
    'c-color-palette-menu-widget',
    'g-list-reset',
    'o-flex-grid',
  ],

  colorHSLAs: null,
  activeColorHSLA: null,
  onColorSelected: null,
  focusElemSelector: '.c-color-palette-menu-widget__color-item:first-child',

  tabindex: 0,

  init () {
    this._super(...arguments);

    this.onColorSelected = (typeof this.onColorSelected === 'function') ? this.onColorSelected : K;
  },


  actions: {

    onColorSelected (selectedHSLA) {
      this._swapFocus(document.activeElement, event.target);
      this.get('onColorSelected')(selectedHSLA);
    },

    onColorKeydown (selectedHSLA, event) {
      const keyCode = event.keyCode || event.which || '';

      if (keyCode === KEYCODE_ENTER) {
        this._swapFocus(document.activeElement, event.target);
        this.get('onColorSelected')(selectedHSLA);
      }
      return false;
    },
  },


  _swapFocus (elemToBlur, elemToFocus) {
    elemToBlur.blur();
    elemToFocus.focus();
  }
});
