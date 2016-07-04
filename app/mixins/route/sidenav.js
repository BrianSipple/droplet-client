import Ember from 'ember';

const {
  Mixin,
  inject: { service }
} = Ember;


export default Mixin.create({

  SidenavService: service('sidenav'),
  store: service(),


  activate() {
    this._super(...arguments);

    const menuItem = this.get('SidenavService.activeFlyoutMenuItem');
    this._setSidenavPanelData(menuItem);
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
      this._setSidenavPanelData(menuItem);
      this.get('SidenavService').onMainMenuItemSelected(itemIndex, menuItem);
    }
  },


  async _setSidenavPanelData({ modelRouteName, queryFunc, hasRouteActivated }) {
    if (hasRouteActivated) {
      this.set('SidenavService.activePanelData', this.modelFor(modelRouteName));

    } else {
      const panelData = await queryFunc.call(this);
      this.set('SidenavService.activePanelData', panelData);
    }
  }

});
