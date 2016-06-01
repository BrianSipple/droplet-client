import Ember from 'ember';

const {
  Component,
  computed,
} = Ember;

export default Component.extend({

  tagName: 'section',
  classNames: [
    'c-page-wrapper',
    'u-fill-width',
    'u-fill-height',
    'u-absolute',
    'u-edge-left',
    'u-edge-right',
    'u-edge-top',
    'u-edge-bottom',
    'u-overflow-auto-y'
  ],

  classNameBindings: ['pageNavbarClass'],

  hasNavbar: null,

  pageNavbarClass: computed('hasNavbar', function pageNavbarClass() {
    return this.get('hasNavbar') ? 'c-page-wrapper--navbar-visible' : '';
  }),

});
