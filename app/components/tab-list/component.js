import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  tagName: 'ul',
  classNames: ['c-tab-list'],
  ariaRole: 'tablist',

  selectedIndex: 0,

  updateSelectedTab(index) {
    this.set('selectedIndex', index);
  }
});
