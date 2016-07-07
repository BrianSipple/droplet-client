import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  NavbarService: service('navbar'),

  beforeModel() {
    this.get('NavbarService').hideNavbar();
  }
});
