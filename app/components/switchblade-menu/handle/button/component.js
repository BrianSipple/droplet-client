import Ember from 'ember';
import ActionButtonMixin from 'droplet/mixins/component/action-button';
import TabbableMixin from 'droplet/mixins/component/tabbable';


const { Component, computed } = Ember;

export default Component.extend(ActionButtonMixin, TabbableMixin, {

  tagName: 'button',

  classNames: [
    'c-switchblade-menu-handle-button',
    'o-flex-grid',
    'o-flex-grid--justifyCenter',
    'o-flex-grid--full',
    'u-fill-width',
    'g-border-none',
    'u-overflow-hide',
    'u-relative',
  ],

  classNameBindings: ['isActive:is-active', 'buttonTypeClass'],

  iconURL: null,
  avatarURL: null,
  title: null,
  isActive: null,
  fillColor: 'currentColor',
  strokeColor: 'currentColor',
  type: 'menu',


  buttonTypeClass: computed('type', function buttonTypeClass () {
    const buttonType = this.get('type');
    const modifier = buttonType === 'auxiliary' ? 'auxiliary' : 'main-menu';

    return `c-switchblade-menu-handle-button--${modifier}`;
  })

});
