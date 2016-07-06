import Ember from 'ember';
import BoxShadowClassMixin from 'droplet/mixins/component/box-shadow-class';

const {
  Component,
  getWithDefault,
  computed,
  run: { next, cancel },
  computed: { readOnly }
} = Ember;


export default Component.extend(BoxShadowClassMixin, {
  classNames: ['c-flash-message', 'o-content'],
  classNameBindings: ['isActive', 'isExiting', 'colorClassName'],

  content: null,
  isActive: false,
  shadowDepth: 3,


  exit () {
    this.set('content.exiting', true);
  },


  isExiting: readOnly('content.exiting'),

  colorClassName: computed('content.type', {
    get() {
      const contentType = this.get('content.type');

      return {
        danger: 'c-flash-message--danger',
        warning: 'c-flash-message--warning',
        success: 'c-flash-message--success',
        info: 'c-flash-message--info'
      }[contentType];
    }
  }),


  didInsertElement() {
    this._super(...arguments);

    // Very shortly after a message is created, add the "active"
    // class to it, so that we can use CSS animations for
    // the entry transition
    this._applyActiveClass = next(() => this.set('isActive', true));
  },

  willDestroyElement() {
    this._super(...arguments);

    // prevent leaking
    this._destroyFlashMessage();

    // To be thorough, we will cancel any queued
    // task to add the "active" class (see: didInsertElement)
    if (this._applyActiveClass) {
      cancel(this._applyActiveClass);
    }
  },


  _destroyFlashMessage() {
    const flashMessage = getWithDefault(this, 'content', false);

    if (flashMessage && typeof flashMessage.destroyMessage === 'function') {
      flashMessage.destroyMessage();
    }
  }
});
