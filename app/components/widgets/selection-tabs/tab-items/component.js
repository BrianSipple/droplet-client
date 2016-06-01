import Ember from 'ember';

const {
  Component,
  computed,
  run,
  isNone,
  isArray,
  set,
} = Ember;


export default Component.extend({

  tagName: 'ul',

  classNames: ['c-tab-selectors'],

  /**
  * Accepts a list of model data items -- each including the following properties:
  *
  *  `title`: {{string}} a display title for a tab
  *  `isActive`: [optional] {{boolean}} an indication that this tab should be highlited as "active" on init,
  */
  tabDataItems: null,

  /**
  * Type for the indicator
  */
  indicatorType: null,

  /**
  * [Experimental] How many items should we care about (or should we care at all, really)?
  */
  limit: null,

  /* Track the index that a new "activeIndex" came from */
  previousIndex: null,

  /**
  * Is tab even, or determined by the size of the text?
  */
  widthDistribution: null,

  /**
  * Boolean option to style as links instead of buttons (only text is clickable)
  */
  styleButtonsAsLinks: null,

  /**
  * Use actual anchor tags (<a>)
  */
  useAnchors: null,


  numTabs: computed('limit', 'tabDataItems', function numTabs() {
    const limit = this.get('limit');
    const tabDataItems = this.get('tabDataItems') || [];

    return Math.floor(limit > 0) ? limit : tabDataItems.length || 0;
  }),


  activeIndex: computed('tabDataItems.@each.isActive', function computedActiveTabItem() {
    const tabDataItems = this.get('tabDataItems');

    if (tabDataItems && isArray(tabDataItems)) {
      const activeItem = tabDataItems.findBy('isActive', true);

      if (activeItem) {
        return tabDataItems.indexOf(activeItem);
      }
    }

    return 0;
  }),


  didReceiveAttrs () {
    this._super(...arguments);
    if (this.get('tabDataItems')) {
      run.scheduleOnce('afterRender', this, this._computeTabWidths);
    }
  },


  _computeTabWidths () {
    const numTabs = this.get('numTabs');
    const tabsContainerElem = this.element;
    const tabElems = [...this.element.children].slice(0, numTabs);
    const indicatorWidths = tabElems.map(el => parseFloat(getComputedStyle(el).width));
    const tabWidths = tabElems.map(el => el.getBoundingClientRect().width);
    const tabsContainerWidth = tabsContainerElem.getBoundingClientRect().width;

    if (!isNone(numTabs) && !isNone(tabElems)) {
      this.set('tabsContainerWidth', tabsContainerWidth);
      this.set('tabWidths', tabWidths);
      this.set('indicatorWidths', indicatorWidths);
    }
  },

  actions: {

    /* Animate, then bubble the action up to delegate to higher-level consumers */
    tabSelect (index) {
      const tabDataItems = this.get('tabDataItems');

      tabDataItems.setEach('isActive', false);
      set(tabDataItems.objectAt(index), 'isActive', true);

      if (typeof this.attrs.onSelect === 'function') {
        this.attrs.onSelect(index);
      }
    },
  },
});
