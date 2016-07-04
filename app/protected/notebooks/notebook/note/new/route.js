import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Route,
  run,
  inject: { service }
} = Ember;


export default Route.extend({

  SidenavService: service('sidenav'),

  addNote: task(function *addNote(noteModel) {
    try {
      const { notebook_id: notebookId } = this.paramsFor('protected.notebooks.notebook.note.new');
      const notebook = yield this.store.findRecord('notebook', notebookId);

      noteModel.set('notebook', notebook);

      run.scheduleOnce('afterRender', this, () => {
        noteModel.save().then(() => {
          this.transitionTo('protected.notebooks.notebooks.note', notebookId, noteModel.get('id'));
        });
      });

    } catch (err) {
      throw new Error(`Error while attempting to post new note: ${err}\nStack: ${err.stack}`);
    }
  }),

  activate() {
    this.get('SidenavService').closeSidenavFlyout();
  },

  async model () {
    const notebook = await this.modelFor('protected.notebooks.notebook');

    return this.store.createRecord('note', {
      notebook,
    });
  },

  actions: {

    /**
     * Initiate the post of the note if the user has pressed enter
     */
    onNotebookTitleEntered () {
      this.get('addNote').perform(this.currentModel);
    },

    onNotebookTitleFocusOut () {
      // TODO: Save edit
    },

    onDiscardNote (note) {
      debugger;
      return note.destroyRecord().then(() => {
        debugger;
        // TODO: Flash message saynig that the note was deleted
        this.transitionTo('protected.dashboard');
      });
    }
  }
});
