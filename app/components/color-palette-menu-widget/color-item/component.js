import Ember from 'ember';
import TabbableMixin from 'droplet/mixins/component/tabbable';

const {
  Component,
  computed,
  String: { htmlSafe },
  K
} = Ember;


export default Component.extend(TabbableMixin, {

  attributeBindings: ['style'],

  classNameBindings: ['isActive:is-active'],
  classNames: [
    'c-color-palette-menu-widget-color-item',
    'u-pointer',
    'u-relative',
  ],

  tabindex: 0,

  colorHSLA: null,
  activeHSLA: null,
  onItemSelected: null,
  onkeydown: null,

  isActive: computed('colorHSLA', 'activeHSLA', function () {
    return this.get('colorHSLA') === this.get('activeHSLA');
  }),

  style: computed('colorHSLA', function computedStyle () {
    return htmlSafe(`background-color: ${this.get('colorHSLA')}`);
  }),


  keyDown (event) {
    // event.preventDefault();
    this.get('onkeydown')(event);
  },


  init () {
    this._super(...arguments);

    this.onkeydown = (typeof this.onkeydown === 'function') ? this.onkeydown : K;
  }

});
