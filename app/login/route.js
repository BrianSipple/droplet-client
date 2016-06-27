import Ember from 'ember';
import DS from 'ember-data';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service }, Object: EmberObject } = Ember;

const { Errors } = DS;


export default Route.extend(UnauthenticatedRouteMixin, {

  SessionService: service('session'),

  /*
   * Prepare a model for logging in the user
   */
  model () {
    return EmberObject.create({
      identification: '',
      password: '',
      errors: Errors.create(),
      isLoading: false,
    });
  },


  actions: {

    /*
     * Given EITHER a username or email, recover the userId and then attempt to
     * authenticate it with the password
     */
    async handleLogin () {
      const model = this.currentModel;
      const credentials = {
        identification: model.get('identification'),
        password: model.get('password'),
      };

      model.set('isLoading', true);
      try {
        await this.get('SessionService').authenticate('authenticator:oauth2', credentials);

      } catch (error) {
        model.get('errors').pushObject(error);

      } finally {
        model.set('isLoading', false);
      }
    }
  }
});
