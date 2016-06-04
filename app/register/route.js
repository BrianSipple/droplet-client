import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { task } from 'ember-concurrency';
import AuthConfig from 'ember-simple-auth/configuration';

const {
  Route,
  inject: { service },
  set,
  assign,
  Object: EmberObject,
} = Ember;


export default Route.extend(UnauthenticatedRouteMixin, {

  SessionService: service('session'),


  registerUser: task(function *registerUser (formValues) {
    const { user, userPrivateInfo } = this.currentModel;
    const SessionService = this.get('SessionService');

    try {
      user.setProperties(formValues);
      userPrivateInfo.setProperties(formValues);

      yield userPrivateInfo.save();
      user.set('userPrivateInfo', userPrivateInfo);
      yield user.save();

      set(this.currentModel, 'isFormDirty', false);

      const credentials = {
        // identification: user.get('userPrivateInfo.email'),
        identification: user.get('username'),
        password: user.get('password'),
      };

      yield SessionService
        .authenticate('authenticator:oauth2', credentials)
        .catch(reason => set(user, 'errors.registration', reason.error || reason))
        .then(() => {
          this.transitionTo(AuthConfig.routeAfterAuthentication);
        });

    } catch (e) {
      debugger;
      set(this.currentModel, 'errors', e.errors);
    }
  }),


  model () {
    const userPrivateInfo = this.store.createRecord('user-private-info');
    const user = this.store.createRecord('user', { userPrivateInfo });

    return {
      user,
      userPrivateInfo,
      formValues: assign(EmberObject.create(), user.toJSON()),
      isFormDirty: false,
    };
  },


  actions: {

    onRegisterUser (userValues) {
      return this.get('registerUser').perform(userValues);
    },

    willTransition (transition) {
      const { isFormDirty } = this.currentModel;

      if (isFormDirty) {
        // TODO: Make this a modal dialog
        const shouldTransition = window.confirm(
          'It looks like you got started on your registration form. ' +
          'Are you sure you\'d like to leave?'
        );

        if (shouldTransition) {
          return true;
        } else {
          transition.abort();
        }
      }
    },

  },

});
