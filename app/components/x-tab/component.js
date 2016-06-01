import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  tagName: 'li',
  classNames: ['u-mr2', 'u-ml2', 'u-relative'],
  classNameBindings: ['isActive'],
});
