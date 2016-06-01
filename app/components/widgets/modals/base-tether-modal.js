import Ember from 'ember';
import BaseModalMixin from 'droplet/mixins/component/modal-dialog';
import BodyEscapePressListener from 'droplet/mixins/body-event-listeners/escape-press';
import TetherModalDialog from 'ember-modal-dialog/components/tether-dialog';

const { K } = Ember;


export default TetherModalDialog.extend(BaseModalMixin, BodyEscapePressListener, {

  /**
   * Custom overrides for the default of "ember-modal-dialog"
   * to style the main widget
   */
  containerClassNames: [

  ],

  /**
   * custom overrides for the default of "ember-modal-overlay"
   * to set up  proper overlay behavior
   */
  overlayClassNames: [

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

    this.close = (typeof this.close === 'function') ? this.close : K;
    this._initOnEscapePressed();
  },


  _initOnEscapePressed() {
    /**
     * Override the `onEscapePressed` that's called by our BodyEscapePressListener
     * and call to our bound close action.
     */
    this.onEscapePressed = (typeof this.close === 'function') ?
      this.onEscapePressed
      :
      function onEscapePressed(event) {
        event.preventDefault();
        this.close();
      }.bind(this);
  },

});
