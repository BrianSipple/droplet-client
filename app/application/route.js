import Ember from 'ember';
import AuthConfiguration from 'ember-simple-auth/configuration';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ApplicationModel from 'droplet/models/application';
import statusCodes from 'droplet/utils/status-codes';

const {
  Route,
  K,
  inject,
  Logger: { log },
} = Ember;


export default Route.extend(ApplicationRouteMixin, {

  // NotificationService: inject.service(),  // future idea
  SessionService: inject.service('session'),
  UserService: inject.service('user'),
  NavbarService: inject.service('navbar'),
  SidenavService: inject.service('sidenav'),


  activate () {
    this._super(...arguments);

    this._setNavbarOptionsOnRouteActivate();
  },

  model () {
    // TODO: Re-evaluate if this is necessary
    return ApplicationModel.create({
      navbar: this.get('NavbarService'),
      sidenav: this.get('SidenavService'),
    });
  },

  afterModel (/* model, transition */) {

    if (this.get('SessionService.isAuthenticated')) {
      // transition.send('loadServerNotifications');  // TODO: Something like this with future NotificationService
    }
  },

  // TODO: Possibly remove usage of ApplicationRouteMixin here
  // and wireup session-event handlers in the session-events instance initializer
  async sessionAuthenticated () {
    try {
      const { userId } = this.get('SessionService.data.authenticated');
      const user = await this.get('UserService').getUserForAuthenticatedSession(userId);

      log(`Setting user for authenticated session: ${user.toJSON()}`);
      this.set('currentUser.content', user);

      if (this.get('SessionService.attemptedTransition')) {
        this.get('SessionService.attemptedTransition').retry();

      } else if (user.get('role') === 'admin') {
        this.transitionTo('protected.admin');

      } else {
        this.transitionTo(AuthConfiguration.routeIfAlreadyAuthenticated);
      }

    } catch (err) {
      log(err.stack);
      // throw new Error(err);
    }

  },


  // noop default for unhandled save (used from shortcuts)
  save: K,


  /**
  * ---------- ACTIONS ----------
  */
  actions: {

    error (error /* , transition */) {
      debugger;
      if (error.code && error.code === statusCodes.FORBIDDEN) {
        // TODO: Figure out the best action here. Right now, let's just
        // go to the routeIfAlreadyAuthenticated
        this.transitionTo(AuthConfiguration.routeIfAlreadyAuthenticated);

      } else {
        throw Error(error);
      }

    },

    /**
    * Called when logging out a user, changing the session state to `invalid`
    */
    invalidateSession (/* transition */) {
      debugger;
      this.get('SessionService')
      .invalidate()
      .catch(this._onInvalidateSessionError);
    },

    onSignedIn () {
      // this.get('notifications').clearAll();
      // this.send('loadServerNotifications', true);
    },

  },

  /**
  * ---------- HELPER FUNCTIONS ----------
  */
  _setNavbarOptionsOnRouteActivate () {
    const navbarComponentNames = this.get('NavbarService.navItemComponentNames');

    this.get('NavbarService').set('visibleItemComponentNames', [
      // WIP
      // navbarComponentNames.searchWidget,
      // navbarComponentNames.loginButton,
      // navbarComponentNames.searchWidget,
    ]);
  },


  _onInvalidateSessionError (/* error */) {
    // this.get('notifications').showAlert(error.message, { type: 'error', key: 'session.invalidate.failed' });
  },

});
