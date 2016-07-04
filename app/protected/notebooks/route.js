import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Route } = Ember;


export default Route.extend({

  addNewNotebookTask: task(function *addNewNotebook(notebookProps) {
    const user = this.get('currentUser');
    debugger;
    const newNotebook = this.store.createRecord('notebook', {
      ...notebookProps,
    });

    user.get('notebooks').pushObject(newNotebook);

    yield newNotebook.save();
    this.refresh();
  }),


  // model () {
  //   debugger;
  //   const userId = this.get('currentUser.id');
  //
  //   return this.store.query('notebook', { owner: userId });
  // },


  // renderTemplate () {
  //   this.render();
  //   this.render(
  //     'sidenav',
  //     { into: 'application', outlet: 'sidenavOutlet' }
  //   );
  // },

  actions: {

    postNewNotebook (notebookProps) {
      return this.get('addNewNotebookTask').perform(notebookProps);
    },

    didTransition () {
      document.title = 'Droplet - Notebooks';
    }
  }

});
