import Ember from 'ember';

const { Service } = Ember;

// NOTE: These are still very tentative
const navbarItemComponentNames = {
  // plans: 'guest-navbar/toolbar-tool/plans-link',
  // about: 'guest-navbar/toolbar-tool/about-link',
  // loginButton: 'guest-navbar/toolbar-tool/login-button',
};

const NAVBAR_HIDDEN_ROUTES = [
  /[^(?:protected)]\.*/,
];


export default Service.extend({

  visibleItemComponentNames: [],
  navItemComponentNames: navbarItemComponentNames,
  routesWhereHidden: NAVBAR_HIDDEN_ROUTES,
  isVisible: true,

  addNavbarOption (optionName) {
    this.get('navbar.visibleOptions').pushObject(optionName);
  },

  removeNavbarOption (optionName) {
    this.set(
      'navbar.visibleOptions',
      this.get('navbar.visibleOptions').filter(name => name !== optionName)
    );
  },

});
