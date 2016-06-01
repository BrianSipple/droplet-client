import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  classNames: ['c-autocomplete-search-dropdown'],
  attributeBindings: ['aria-hidden', 'tabindex'],


  /**
   * Because the toggle shouldn't be tabbable, there's no reason to give it any
   * roles or even be visible to screen readers.
   */
  'aria-hidden': true,

  /**
   * We don't want the toggle to be tabbable. Keyboard users can open the
   * menu with arrow keys or typing.
   *
   * @property tabindex
   * @private
   */
  tabindex: -1,


});
