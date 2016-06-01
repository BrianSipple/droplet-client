import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({

  tagName: 'li',

  classNames: [
    'o-list-item--tall',
    'o-highlighted-on-hover',
    'u-fill-width--minus-p3',
    'u-height-spacing-5',
    'u-pt2',
    'u-pr3',
    'u-pb2',
    'u-pl3',
    'u-relative',
    'u-overflow-hide',
    'a-trans-ease-colorShift',
    'g-border-bottom-s1',
  ],
});
