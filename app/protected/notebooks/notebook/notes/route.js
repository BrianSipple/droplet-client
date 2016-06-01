import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Route, inject: { service } } = Ember;


export default Route.extend({

  NotebookPageService: service('notebook-page'),


  postNoteTask: task(function *newNoteTask(noteProps) {
    const notebook = this.currentModel;
    const newNote = this.store.createRecord('note', {
      ...noteProps,
      notebook,
    });

    return yield newNote.save();
  }).drop(),

  updateNoteTask: task(function *updateNoteTask (note) {
    note.incrementProperty('revisionCount');

    return yield note.save();
  }).restartable(),


  actions: {

    openNote (note) {
      this.transitionTo('protected.notebooks.notebook.note', note);
    },

    postNewNote (noteProps) {
      return this.get('postNoteTask').perform(noteProps);
    },

    updateNoteDataFromListPage (note, skipDirtyCheck) {
      if (note.get('hasDirtyAttributes') || skipDirtyCheck) {
        return this.get('updateNoteTask').perform(note);
      }
    },

    filterNotesFromSearchInput (searchInput) {
      const notes = this.currentModel.get('notes');

      return this.get('NotebookPageService').filterNotesFromSearchInput(searchInput, notes);
    }

  }
});
