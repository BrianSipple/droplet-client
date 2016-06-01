import Ember from 'ember';
import { task } from 'ember-concurrency';


const { Route } = Ember;


export default Route.extend({

  updateNoteTask: task(function *updateNote (note) {
    return yield note.save();
  }).restartable(),


  actions: {

    onCloseNote (note) {
      const notebookId = note.get('notebook.id');
      this.transitionTo('protected.notebooks.notebook', notebookId);  // QUESTION: Do we still need the id here since the model has already been resolved?
    },

    onSaveNote (note) {
      return this.get('updateNoteTask').perform(note);
    }
  }
});
