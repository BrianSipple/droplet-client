import Ember from 'ember';
import AssetConstants from 'droplet/utils/constants/asset-paths';

const {
  Component,
  computed,
  run,
  set,
  get,
  K,
} = Ember;


export default Component.extend({

  tagName: 'nav',
  classNames: ['c-switchblade-menu-handle'],


  flyoutMenuItems: null,
  auxiliaryTabItems: null,
  activeMenuItemIndex: null,
  previousMenuItemIndex: null,
  isFlyoutOpen: false,
  onMainMenuItemSelected: null,

  logoIconPath: AssetConstants.icons.WIREFRAME_DROP,


  flyoutToggleButtonIconPath: computed('isFlyoutOpen', function flyoutToggleButtonIconPath () {
    return AssetConstants.icons[`${this.get('isFlyoutOpen') ? 'CLOSE_X' : 'HAMGURGER_MENU'}`];
  }),

  flyoutToggleButtonLabel: computed('isFlyoutOpen', function flyoutToggleButtonLabel() {
    return this.get('isFlyoutOpen') ? 'CLOSE' : 'OPEN';
  }),


  init () {
    this._super(...arguments);

    this.onMainMenuItemSelected = (typeof this.onMainMenuItemSelected === 'function') ? this.onMainMenuItemSelected : K;
  },


  actions: {

    mainMenuItemSelected (itemIndex, menuItem) {
      this.get('onMainMenuItemSelected')(itemIndex, menuItem);
    },

    auxiliaryTabItemSelected (itemIndex, routeName) {
      const onRouteSelection = get(this, 'onRouteSelection');

      if (typeof onRouteSelection === 'function') {
        onRouteSelection(routeName);
      }
    },

    userSettingsWidgetSelected () {

    },
  },

});
