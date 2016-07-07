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
    'u-edge-bottom'
  ],

  classNameBindings: ['pageNavbarClass', 'overflowY:u-overflow-auto-y'],

  hasNavbar: null,
  overflowY: true,

  pageNavbarClass: computed('hasNavbar', {
    get() {
      return this.get('hasNavbar') ? 'c-page-wrapper--navbar-visible' : '';
    }
  })

});
