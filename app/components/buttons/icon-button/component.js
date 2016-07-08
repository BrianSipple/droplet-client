import Ember from 'ember';
import PressActionMixin from 'droplet/mixins/component/press-action';
import XButton from 'droplet/components/x-button/component';

const { Component, computed } = Ember;

export default XButton.extend(PressActionMixin, {
  classNames: ['c-icon-button', 'u-pointer', 'g-border-none'],

  iconURL: null,
  stroke: 'currentColor',
  strokeWidth: '0.125em',
  iconWidth: '75%',
  iconHeight: '75%',
  fill: 'currentColor'
});
