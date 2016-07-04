import Ember from 'ember';
import AuthConfiguration from 'ember-simple-auth/configuration';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import statusCodes from 'droplet/utils/status-codes';

const {
  Route,
  K,
  inject: { service },
  Logger: { log },
} = Ember;


export default Route.extend(ApplicationRouteMixin, {

  // NotificationService: inject.service(),  // future idea
  SessionService: service('session'),
  UserService: service('user'),
  NavbarService: service('navbar'),
  SidenavService: service('sidenav'),

  model() {
    return {
      sidenav: this.get('SidenavService'),
      navbar: this.get('NavbarService')
    };
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

  _onInvalidateSessionError (/* error */) {
    // this.get('notifications').showAlert(error.message, { type: 'error', key: 'session.invalidate.failed' });
  }

});
