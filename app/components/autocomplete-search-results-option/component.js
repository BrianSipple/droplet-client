import Ember from 'ember';

const { Component, K, computed } = Ember;
const { bool } = computed;


export default Component.extend({
  tagName: 'li',
  classNames: ['c-autocomplete-search-results-option'],

  attributeBindings: ['aria-label', 'selected', 'tabindex', 'id'],
  classNameBindings: ['isFocused', 'isActive'],

  item: null,
  isFocused: false,
  isSelected: false,
  onItemSelected: null,
  idPrefix: null,
  index: null,

  /**
   * We do not want the options to be tabbable, but we do want to focus them.
   *
   * @property tabindex
   * @private
   */
  tabindex: -1,
  ariaRole: 'option',


  id: computed('idPrefix', 'index', function id() {
    return `${this.get('idPrefix')}${this.get('index')}`;
  }),

  /**
   *  Attribute binding to facilitate CSS on selected options.  Can style with
   * `ic-autocomplete-option[selected] {}`
   *
   * @property selected
   * @private
   */
  selected: bool('isSelected'),



  click (event) {
    event.preventDefault();

    this.send('itemGotSelected', this.get('item'));
  },


  init () {
    this._super(...arguments);

    this.onItemSelected = (typeof this.onItemSelected === 'function') ? this.onItemSelected : K;
  },

  didUpdateAttrs (options) {
    this._super(...arguments);

    const wasSelected = options.oldAttrs.isSelected;

    if (this.get('isSelected') && !wasSelected) {
      this.send('itemGotSelected', this.get('item'));
    }
  },


  actions: {

    itemGotSelected (item) {
      this.get('onItemSelected')(item);
    },
  },

});
