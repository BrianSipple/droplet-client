import Ember from 'ember';
import PressActionMixin from 'droplet/mixins/component/press-action';

const { Component, computed } = Ember;

export default Component.extend(PressActionMixin, {

  tagName: 'button',
  classNames: ['c-icon-button', 'u-pointer', 'g-border-none'],
  classNameBindings: ['tapTargetSizeClass', 'fab:g-border-circle'],

  iconURL: null,
  stroke: 'currentColor',
  strokeWidth: '0.125em',
  iconWidth: '75%',
  iconHeight: '75%',
  fill: 'currentColor',
  fab: false,
  size: 'small',


  tapTargetSizeClass: computed('size', {
    get() {
      const size = this.get('size') || '';

      return {
        xsmall: 'o-tap-target-xs',
        small: 'o-tap-target-sm',
        medium: 'o-tap-target-md',
        large: 'o-tap-target-lg',
      }[size.toLowerCase()] || null;
    }
  })
});
