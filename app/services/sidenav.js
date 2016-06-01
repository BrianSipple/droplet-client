import Ember from 'ember';
import uuid from 'ember-simple-uuid';

const {
  Service,
  run,
  set,
  computed,
  inject: { service }
} = Ember;

const { alias } = computed;

/* eslint max-len: 0 */
const sidenavFlyoutMenuItems = [

  {
    routeName: 'protected.notebooks',
    title: 'Notebooks',
    iconURL: 'assets/icons.svg#icon_notebook--flat-cover',
    handleKey: uuid(),
    flyoutPanelComponentName: 'switchblade-menu/flyout-panels/notebooks',
    isActive: true,
  },

  {
    routeName: 'protected.notebooks.notebook.notes', // TODO: un-nest?
    title: 'Notes',
    iconURL: 'assets/icons.svg#icon_wireframe-drop-logo',
    handleKey: uuid(),
    flyoutPanelComponentName: 'switchblade-menu/flyout-panels/notes',
    isActive: false,
  },

  {
    routeName: 'protected.tags',
    title: 'Tags',
    iconURL: 'assets/icons.svg#icon_tag-pair',
    handleKey: uuid(),
    flyoutPanelComponentName: 'switchblade-menu/flyout-panels/tags',
    isActive: false,
  },

  {
    routeName: 'protected.pools',
    title: 'Ponds',
    iconURL: 'assets/icons.svg#icon_wireframe-drop-logo',
    handleKey: uuid(),
    flyoutPanelComponentName: 'switchblade-menu/flyout-panels/pools',
    isActive: false,
  },
];


/**
 * Not sure exactly how to approach this yet, but these will
 * be the bottom options on the sidenav handle that lead
 * straight to other pages -- NOT a sliding menu in the flyout
 */
const sidenavAuxiliaryTabItems = [
  { routeName: 'protected.notifications', title: 'Notifications', iconURL: 'assets/icons.svg#icon_wireframe-drop-logo', handleKey: uuid() },
  { routeName: 'protected.graphs', title: 'Graphs', iconURL: 'assets/icons.svg#icon_wireframe-drop-logo', handleKey: uuid() },
  { routeName: 'protected.chat', title: 'Chat', iconURL: 'assets/icons.svg#icon_wireframe-drop-logo', handleKey: uuid() },
];



const SIDENAV_HIDDEN_ROUTES = [
  /^(?!.*protected\.*).*/,   //  anything not under `protected`
];



export default Service.extend({

  store: service(),
  activePanelData: null,

  flyoutMenuItems: sidenavFlyoutMenuItems,
  auxiliaryTabItems: sidenavAuxiliaryTabItems,

  previousMenuItemIndex: -1,
  activeMenuItemIndex: 0,

  isFlyoutOpen: true,
  hasToggled: false,

  routesWhereHidden: SIDENAV_HIDDEN_ROUTES,


  toggleSidenavFlyout () {
    this.set('hasToggled', true);
    this.toggleProperty('isFlyoutOpen');
  },

  closeSidenavFlyout () {
    this.set('isFlyoutOpen', false);
  },

  openSidenavFlyout () {
    this.set('isFlyoutOpen', true);
  },

  onMainMenuItemSelected (itemIndex, menuItem) {
    run.once(this, () => {
      this.set('previousMenuItemIndex', this.get('activeMenuItemIndex'));
      this.set('activeMenuItemIndex', itemIndex);
      this.get('flyoutMenuItems').setEach('isActive', false);
      set(menuItem, 'isActive', true);
    });
  },


  activeFlyoutMenuItem: computed('activeMenuItemIndex', function activeFlyoutMenuItem () {
    const activeMenuItemIndex = this.get('activeMenuItemIndex');

    return this.get('flyoutMenuItems').objectAt(activeMenuItemIndex);
  }),

  activeFlyoutComponentName: alias('activeFlyoutMenuItem.flyoutPanelComponentName'),
});
