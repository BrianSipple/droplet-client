import Ember from 'ember';
import ActionButtonMixin from 'droplet/mixins/component/action-button';
import AriaAttributesMixin from 'droplet/mixins/component/aria-attributes';
import TabbableMixin from 'droplet/mixins/component/tabbable';


const { Component, computed } = Ember;


export default Component.extend(ActionButtonMixin, AriaAttributesMixin, TabbableMixin, {

  tagName: 'button',
  ariaRole: 'button',
  classNames: ['c-icon-button', 'u-pointer', 'g-border-none'],
  classNameBindings: ['tapTargetSizeClass'],

  iconURL: null,
  stroke: null,
  strokeWidth: null,
  fill: null,
  size: null,

  tapTargetSizeClass: computed('size', function tapTargetSizeClass () {
    const size = this.get('size') || '';

    return {
      'xsmall': 'o-tap-target-xs',
      'small': 'o-tap-target-sm',
      'medium': 'o-tap-target-md',
      'large': 'o-tap-target-lg',
    }[size.toLowerCase()] || null;
  }),
});
