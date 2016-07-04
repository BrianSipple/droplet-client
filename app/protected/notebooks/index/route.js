import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  SidenavService: service('sidenav'),

  model () {
    const userId = this.get('currentUser.id');

    return this.store.query('notebook', { owner: userId });
  },

  afterModel(/* model, transition */) {
    this.get('SidenavService').markFlyoutItemModelActivated(this.routeName);
  }
});
