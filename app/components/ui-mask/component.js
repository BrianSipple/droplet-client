import Ember from 'ember';

const { Component, computed } = Ember;
const { oneWay } = computed;


export default Component.extend({

  tagName: 'section',
  classNames: ['c-ui-mask'],
  classNameBindings: ['sidenavActiveClass'],

  sidenavState: null,

  isActive: oneWay('appState.sidenav.isOpen'),


  /**
   * NOTE: I'm making this a separate macro than `isActive` for now, because I want
   * to note the possibility for having different "isActive" macros for different states of the application,
   * and thus, potentially, applying different styling (i.e. opacity levels) for each.
   */
  sidenavActiveClass: computed('isActive', function sidenavActiveClass() {
    return this.get('isActive') ? 'sidenav-active' : '';
  }),

  click () {
    this.attrs.onPressed();
  },

});
