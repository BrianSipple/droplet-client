import Ember from 'ember';
import SidenavRouteMixin from 'droplet/mixins/route/sidenav';
import AuthConfig from 'ember-simple-auth/configuration';

const { Route, inject: { service } } = Ember;


export default Route.extend(SidenavRouteMixin, {
  NavbarService: service('navbar'),
  SessionService: service('session'),

  /**
   * TODO: More robust login around retrys, aborts, etc.
   */
  beforeModel () {
    if (!this.get('SessionService.isAuthenticated')) {
      this.transitionTo(AuthConfig.authenticationRoute);
    }

    this.get('NavbarService').set('isNavbarVisible', false);
  },

  renderTemplate() {
    this.render();
    this.render(
      'sidenav',
      { into: 'application', outlet: 'sidenavOutlet' }
    );
  },


  actions: {

    openNotebook (notebook) {
      this.transitionTo('protected.notebooks.note', notebook.get('id'));
    },
  },


});
