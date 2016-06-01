import Ember from 'ember';

const {
  Service,
  inject: { service },
} = Ember;


export default Service.extend({

  store: service(),

  getUserForAuthenticatedSession (userId) {
    return this.get('store').findRecord('user', userId);
  },

});
