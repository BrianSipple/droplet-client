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
      debugger;
      user.validate().then(( {model, validations }) => {
        debugger;
        if (validations.get('isValid')) {
          // this.currentModel.setProperties({'isRegistered': true});
          this.currentModel.set('isRegistered', true);

        } else {
          this.currentModel.set('isRegistered', false);
        }
      });

      yield user.save();

      if (user.get('validations.isValid')) {
        const credentials = {
          identification: user.get('username'),
          password: user.get('password'),
        };

        yield SessionService
          .authenticate('authenticator:oauth2', credentials)
          .catch(reason => set(user, 'errors.registration', reason.error || reason))
          .then(() => {
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
