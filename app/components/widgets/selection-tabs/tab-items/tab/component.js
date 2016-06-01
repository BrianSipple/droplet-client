import Ember from 'ember';
import crossBrowserizeStyleString from 'droplet/utils/dom/cross-browserize-style-string';

const {
  Component,
  computed,
  String: { htmlSafe },
} = Ember;

const { bool } = computed;

const widthDistributions = {
  EVEN: 'even',
  AUTO: 'auto',
  CUSTOM: 'custom',
};


export default Component.extend({

  tagName: 'li',
  classNames: ['c-tab-selectors__tab c-selection-tab u-relative'],
  classNameBindings: ['isActive:active'],
  attributeBindings: ['style'],

  tabItem: null,
  tabIndex: null,

  /**
   * Boolean option to style the button inside of the li as a link (only text is clickable)
   */
  styleButtonAsLink: null,

  /**
   * Use an actual anchor tag (<a>)
   */
  useAnchor: null,
  widthDistribution: false,


  isActive: bool('tabItem.isActive'),


  style: computed('tabItem.flexGrow', 'widthDistribution', function style() {

    const widthDistribution = this.get('widthDistribution');

    if (widthDistribution === widthDistributions.AUTO) {
      return htmlSafe(`${crossBrowserizeStyleString('flex', '0 1 auto')} flex: 0 1 auto;`);
    }

    if (widthDistribution === widthDistributions.EVEN) {
      return htmlSafe(`${crossBrowserizeStyleString('flex', '1 0 0%')} flex: 1 0 0%;`);
    }

    let flexGrow = this.get('tabItem.flexGrow');
    flexGrow = Math.floor(flexGrow) >= 0 ? flexGrow : 1;

    return htmlSafe(`${crossBrowserizeStyleString('flex-grow', flexGrow)} flex-grow: ${flexGrow};`);
  }),


  actions: {

    select (index) {
      if (typeof this.attrs.onSelect === 'function') {
        this.attrs.onSelect(index);
      }
    },
  },

});
