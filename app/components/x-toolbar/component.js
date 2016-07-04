import Ember from 'ember';

const { Component, computed } = Ember;


export default Component.extend({
  tagName: 'section',  // TODO: extend with an x-navbar that just sets this to `nav` (Or just overwrite tagname in template)?

  classNames: [
    'c-toolbar',
    'u-relative',
    'u-fill-width',
    'u-edge-top',
    'u-edge-left'
  ],

  classNameBindings: [
    'useBorder:g-border-bottom-s2',
    'useBoxShadow:g-box-shadow-2',
    'isFixed:u-fixed',
    'headerSizeClass',
    'flexClassNames'
  ],

  /*
   * Optional component names to render as navar "option items"
   */
  itemComponentNames: null,

  useBorder: false,
  isFlex: true,
  useBoxShadow: true,
  isFixed: true,
  size: 'medium',

  headerSizeClass: computed('size', {
    get() {
      const size = this.get('size');

      return {
        xSmall: 'o-header-xs',
        small: 'o-header-sm',
        medium: 'o-header-md',
        large: 'o-header-lg'
      }[size];
    }
  }),

  flexClassNames: computed('isFlex', {
    get() {
      return this.get('isFlex') ? `o-flex-grid o-flex-grid--center o-flex-grid--noWrap` : null;
    }
  })

});
