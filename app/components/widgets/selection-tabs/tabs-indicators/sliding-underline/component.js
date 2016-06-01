import Ember from 'ember';

const {
  Component,
  String: { htmlSafe },
  computed,
  isArray,
} = Ember;

const { sum } = computed;


export default Component.extend({

  classNames: ['c-tabs-indicator', 'c-tabs-indicator--underline'],
  classNameBindings: ['indicatorTypeClass'],
  attributeBindings: ['style'],

  /* Number of tabs in the set that we're augmenting */
  numTabs: null,

  /**
   * Bind to an array with the values of our item set's tab
   * widths so that -- when width is dynamic -- the indicator
   * can resize itself without having to read the DOM
   */
  tabWidths: null,
  indicatorWidths: null,
  tabsContainerWidth: null,
  activeIndex: null,
  previousIndex: null,


  init() {
    this._super(...arguments);
    this.previousIndex = this.get('activeIndex') > 0 ? this.get('activeIndex') : 0;
  },


  totalTabSetWidth: sum('tabWidths'),

  indicatorWidth: computed('indicatorWidths', 'activeIndex', function () {

    const indicatorWidths = this.get('indicatorWidths');
    const activeIndex = this.get('activeIndex');

    if (activeIndex >= 0 && indicatorWidths && isArray(indicatorWidths)) {
      return indicatorWidths[activeIndex];
    }

    return 0;
  }),


  /**
   * Compute an xOffset relative to a "left center" transform origin
   */
  indicatorXOffsetPct: computed('indicatorWidth', 'tabsContainerWidth', 'activeIndex', function () {
    const tabWidths = this.get('tabWidths');
    const activeIndex = this.get('activeIndex');
    const tabsContainerWidth = this.get('tabsContainerWidth');

    if (tabsContainerWidth > 0 && tabWidths && isArray(tabWidths)) {
      return tabWidths.reduce((accumulatedPct, currentWidth, idx) => {
        if (idx < activeIndex) {
          return accumulatedPct + ((currentWidth / tabsContainerWidth) * 100);
        }
        return accumulatedPct;
      }, 0);
    }

    return 0;
  }),


  style: computed('indicatorWidth', 'indicatorXOffsetPct', 'tabsContainerWidth', function () {
    const tabsContainerWidth = this.get('tabsContainerWidth');
    const totalTabSetWidth = this.get('totalTabSetWidth');
    const indicatorWidth = this.get('indicatorWidth');

    if (totalTabSetWidth && indicatorWidth && totalTabSetWidth > indicatorWidth > 0) {

      const xOffsetPercentage = this.get('indicatorXOffsetPct') || 0;
      const scaleX = indicatorWidth / tabsContainerWidth;

      return htmlSafe(`transform: translateX(${xOffsetPercentage}%) scaleX(${scaleX})`);
    }
  }),


  /**
   * After the initial render, when the attributes update with our tab information,
   * we can compute the position and width of the indicator and display it.
   */
  didUpdateAttrs () {
    this._super(...arguments);

    const numTabs = this.get('numTabs');

    if (numTabs) {

      const tabsContainerWidth = Number(this.get('tabsContainerWidth'));
      const tabWidths = this.get('tabWidths');

      if (tabsContainerWidth > 0 && !tabWidths) {
        this.set('tabWidths', Array.from(new Array(numTabs), () => tabsContainerWidth / numTabs));
      }
    }
  },
});
