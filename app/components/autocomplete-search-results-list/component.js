import Ember from 'ember';

const { Component, computed: { bool } } = Ember;


export default Component.extend({
  tagName: 'ul',
  classNames: ['c-autocomplete-search-results-list'],
  attributeBindings: ['aria-expanded', 'tabindex'],
  classNameBindings: ['isShowing:is-visible', 'hasToggled'],


  isShowing: false,

  /**
   * We don't want the toggle to be tabbable. Keyboard users can open the
   * menu with arrow keys or typing.
   *
   * @property tabindex
   * @private
   */
  tabindex: -1,
  ariaRole: 'listbox',


  'aria-expanded': bool('isShowing'),



});
