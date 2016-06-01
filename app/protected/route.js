import Ember from 'ember';
import SidenavRouteMixin from 'droplet/mixins/route/sidenav';
import RouteConstants from 'droplet/utils/constants/routes';
import AuthConfiguration from 'ember-simple-auth/configuration';

const { Route, inject: { service } } = Ember;
const { GUEST_ROUTE } = RouteConstants;

export default Route.extend(SidenavRouteMixin, {

  SessionService: service('session'),

  /**
   * TODO: More robust login around retrys, aborts, etc.
   */
  beforeModel (transition) {
    if (!this.get('SessionService.isAuthenticated')) {
      this.transitionTo(GUEST_ROUTE);
    }
  },

  renderTemplate() {
    this.render();
    this.render(
      'sidenav',
      { into: 'application', outlet: 'sidenav' }
    );
  },


  actions: {

    openNotebook (notebook) {
      this.transitionTo('protected.notebooks.note', notebook.get('id'));
    },
  },


});
