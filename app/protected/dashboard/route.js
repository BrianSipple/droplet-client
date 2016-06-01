import Ember from 'ember';
import { task } from 'ember-concurrency';

// Extending AuthenticatedRouteMixin will make the route (and all of its subroutes) transition to a
// configurable login route when the session is not authenticated.
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;


export default Route.extend(AuthenticatedRouteMixin, {

  postNewNotebook: task(function *postNewNotebook(notebookProps = {}) {
    const notebook = this.store.createRecord('notebook', {
      title: notebookProps.get('title'),
    });

    try {
      yield notebook.save();
      // TODO: Proper validation and error handling
      this.logger.yay(`Notebook successfully created: ${notebook.get('title')}`);
      this.refresh();

    } catch (err) {
      throw new Error('Error while attempting to post new notebook: ', err.stack);
    }
  }),

  renderTemplate () {
    this._super(...arguments);

    this.render(
      'sidenav',
      {
        into: 'protected',
        outlet: 'sidenavOutlet'
      }
    );
  },


  actions: {

    postNewNotebook(notebookProps = {}) {
      return this.get('postNewNotebook').perform(notebookProps);
    },
  },

});
