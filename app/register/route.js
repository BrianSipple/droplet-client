import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { task } from 'ember-concurrency';
import AuthConfig from 'ember-simple-auth/configuration';

const {
  Route,
  inject: { service },
  computed: { or, not, notEmpty },
  set,
  assign,
  Logger: { log },
  Object: EmberObject,
} = Ember;

const RegistrationData = EmberObject.extend({
  user: null,
  isUserInvalid: not('user.validations.isValid'),
  isUserPrivateInfoInvalid: not('user.userPrivateInfo.validations.isValid'),
  showAlert: or('isUserInvalid', 'isUserPrivateInfoInvalid') // TODO: Handle this properly
});


export default Route.extend(UnauthenticatedRouteMixin, {

  SessionService: service('session'),

  registerUser: task(function *registerUser (formValues) {
    const { user } = this.currentModel;
    const SessionService = this.get('SessionService');

    try {
      yield user.validate().then(( {model, validations } ) => {
        if (validations.get('isValid')) {
          this.currentModel.set('isRegistered', true);

        } else {
          this.currentModel.set('isRegistered', false);
        }
      });

      yield user.save();

      if (user.get('validations.isValid')) {
        const { username: identification, password } = user.getProperties('username', 'password');
        const credentials = { identification, password };

        log(`User registration successful`);

        yield SessionService
          .authenticate('authenticator:oauth2', credentials)
          .catch(reason => set(user, 'errors.registration', reason.error || reason))
          .then(() => {
            log(`User authentication successful`);
            this.transitionTo(AuthConfig.routeAfterAuthentication);
          });

      } else {
        debugger;
        yield true;
      }

    } catch (e) {
      debugger;
      set(this.currentModel, 'errors', e.errors);
    }
  }),


  model () {
    const userPrivateInfo = this.store.createRecord('user-private-info');
    const user = this.store.createRecord('user', { userPrivateInfo });

    return RegistrationData.create({
      user
    });

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
