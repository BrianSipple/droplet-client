import Ember from 'ember';

const {
  Component,
  computed,
  get,
  Object: EmberObject,
} = Ember;

const { map } = computed;

const WIDTH_DISTRIBUTION__EVEN = 'even';
const WIDTH_DISTRIBUTION__AUTO = 'auto';
const WIDTH_DISTRIBUTION__CUSTOM = 'custom';

const WIDTH_DISTRIBUTIONS = [
  WIDTH_DISTRIBUTION__EVEN,
  WIDTH_DISTRIBUTION__AUTO,
  WIDTH_DISTRIBUTION__CUSTOM,
];

const TabDataItem = EmberObject.extend({
  isActive: false,
  title: null,
  flexGrowVal: null,
});

export default Component.extend({

  classNames: ['c-content-filter-toolbar', 'u-relative'],
  classNameBindings: ['tabJustificationClassName'],

  /**
  * Accepts a list of objects -- where each object includes the following properties:
  *
  *  `title`: {{string}} a display title for a tab
  *  `isActive`: [optional] {{boolean}} an indication that this tab should be highlited as "active" on init,
  *  `flexGrow`: [optional] {{number}} the `flex-grow` amount to place on each item's element
  */
  filters: null,

  /**
  * Boolean option to style as links instead of buttons (only text is clickable)
  */
  styleButtonsAsLinks: null,

  /**
  * Use actual anchor tags (<a>)
  */
  useAnchors: false,

  /**
  * Should the filter items space themselves evenly, or have
  * width based upon the "title" size
  */
  widthDistribution: null,

  /**
  * Limit the number of filter items rendered on the toolbar
  */
  limit: null,

  /**
  * flex-start, center, or flex-end (default is center)
  */
  justifyItems: null,


  init () {
    this._super(...arguments);
    if (!~WIDTH_DISTRIBUTIONS.indexOf(this.widthDistribution)) {
      this.widthDistribution = WIDTH_DISTRIBUTION__EVEN;
    }
  },

  tabItemComponentType: computed('useAnchors', function tabItemComponentType() {
    const tabsType = !!this.get('useAnchors') ? 'links' : 'buttons';
    return `ui-kit/widgets/selection-tabs/tab-items/tab-${tabsType}`;
  }),


  tabAppearanceClassName: computed('useAnchors', 'styleButtonAsLinks', function tabComponentClassNames() {

    if (!!this.get('useAnchors')) {
      return 'c-content-filter-toolbar__anchor-tabs';
    }
    if (!!this.get('styleButtonAsLinks')) {
      return 'c-content-filter-toolbar__link-styled-tabs';
    }

    return 'c-content-filter-toolbar__button-tabs';
  }),


  tabJustificationClassName: computed('justifyItems', function () {
    if (this.get('justifyItems')) {
      const justification = this.get('justifyItems').toLowerCase();

      if (~['flexstart', 'flex-start', 'start', 'left'].indexOf(justification)) {
        return 'justify-left';
      }
      if (~['middle', 'center'].indexOf(justification)) {
        return 'justify-center';
      }
      if (~['flexend', 'flex-end', 'end', 'right'].indexOf(justification)) {
        return 'justify-right';
      }
    }

    return 'justify-center';
  }),


  tabComponentClassNames: computed('tabAppearanceClassName', function tabComponentClassNames() {
    return `c-content-filter-toolbar__tabs ${this.get('tabAppearanceClassName')}`;
  }),

  activeSection: computed('filters.@each.isActive', function activeSection () {
    return this.get('filters').filter(filterItem => filterItem.isActive)[0];
  }),


  tabDataItems: map('filters', function mapTabDataItems(item /*, idx */) {

    const title = get(item, 'title');
    const isActive = !!get(item, 'isActive');
    const flexGrow = get(item, 'flexGrow');
    const flexGrowVal = Number.isNaN(Number(flexGrow)) ? 1 : flexGrow;

    return TabDataItem.create({ title, isActive, flexGrowVal });
  }),


  actions: {

    /* The component itsef takes care of animating the indicator. Here, we just broadcast the index selected */
    filterSelected (index) {
      if (typeof this.attrs.onFilterSelected === 'function') {
        this.attrs.onFilterSelected(index);
      }
    }
  },

});
