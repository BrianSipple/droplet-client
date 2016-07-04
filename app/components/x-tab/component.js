import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  tagName: 'li',
  classNames: ['c-tab'],
  classNameBindings: ['isActive'],
  ariaRole: 'presentation'
});
