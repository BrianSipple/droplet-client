import Ember from 'ember';

const { Component, inject: { service } } = Ember;


// TODO: Move this entire component into the sidenav pod?
export default Component.extend({

  SidenavService: service('sidenav'),
  classNames: ['c-switchblade-menu'],
  classNameBindings: ['isFlyoutOpen:is-flyout-expanded:is-flyout-collapsed']
});
