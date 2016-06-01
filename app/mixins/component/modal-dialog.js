import Ember from 'ember';
import SavvyBoxShadowClassMixin from 'droplet/mixins/component/savvy-box-shadow';

const { Mixin } = Ember;


export default Mixin.create({

  /**
   * Custom overrides for the default of "ember-modal-dialog"
   * to style the main widget
   */
  containerClassNames: [
    'c-modal',
    'o-widget-box',
    'g-border-s1',
    'g-box-shadow-1',
    'o-content',
    'u-fixed',
  ],

  /**
   * custom overrides for the default of "ember-modal-overlay"
   * to set up  proper overlay behavior
   */
  overlayClassNames: [
    'c-modal-overlay',
    'u-fixed',
    'u-edge-top',
    'u-edge-right',
    'u-edge-bottom',
    'u-edge-left',
    'u-full-bleed',
    'u-z500',
  ],

  /* custom overrides for the default of "ember-modal-wrapper" */
  wrapperClassNames: [

  ],


  /**
   * A la `classNameBindings`, we can override init to dynamically
   * configure what we send for `ember-modal-dialog`'s containerClassNames,
   * overlayClassNames, and wrapperClassNames
   *
   *  if (this.translucentOverlay) {
   *   this.overlayClassNames.push('c-modal--translucent');
   *  }
   */
  init () {
    this._super(...arguments);
  },


});
