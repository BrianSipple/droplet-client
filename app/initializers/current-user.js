import Ember from 'ember';

const { ObjectProxy } = Ember;


export function initialize (application) {

  const currentUserService = ObjectProxy.create({ isServiceFactory: true });
  application.register('service:current-user', currentUserService, { instantiate: false, singleton: true });

  application.inject('route', 'currentUser', 'service:current-user');
  application.inject('component', 'currentUser', 'service:current-user');
  application.inject('authenticator', 'currentUser', 'service:current-user');
  application.inject('authorizer', 'currentUser', 'service:current-user');
  application.inject('mixin', 'currentUser', 'service:current-user');
}

export default {
  name: 'current-user',
  before: 'ember-simple-auth',
  initialize,
};
