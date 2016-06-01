import Ember from 'ember';

const {
  Mixin,
  inject: { service },
  run,
} = Ember;


export default Mixin.create({

  SidenavService: service('sidenav'),
  store: service(),


  activate() {
    this._super(...arguments);

    this._setSidenavPanelModelData(this.get('SidenavService.activeFlyoutMenuItem.routeName'));
  },


  actions: {

    closeSidenavFlyout () {
      this.get('SidenavService').closeSidenavFlyout();
    },

    openSidenavFlyout () {
      this.get('SidenavService').openSidenavFlyout();
    },

    toggleSidenavFlyout () {
      this.get('SidenavService').toggleSidenavFlyout();
    },

    onMainMenuItemSelected (itemIndex, menuItem) {
      this._setPanelModelData(menuItem.routeName);
      this.get('SidenavService').onMainMenuItemSelected(itemIndex, menuItem);

      // this.transitionTo(menuItem.routeName);
    },

    closeSidenavFlyoutAndTransition (routeName, ...params) {
      this.send('closeSidenavFlyout');
      run.scheduleOnce('afterRender', this, () => this.transitionTo(routeName, ...params));
    },
  },


  _setSidenavPanelModelData(modelFor) {
    this.set('SidenavService.activePanelData', this.modelFor(modelFor));
  }

});
