import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, K, computed } = Ember;
const BODY_UPDATE_DEBOUNCE_MS = 1200;


export default Component.extend({

  classNames: ['c-note-page'],

  isMarkdownPreviewVisible: false,
  exitNote: null,
  persistNoteChanges: null,
  isPersistingChanges: false,
  discardOnExit: false,
  note: null,


  exitButtonTitle: computed('discardOnExit', function exitButtonActionName () {
    return this.get('discardOnExit') ? 'Delete' : 'Close';
  }),


  persistNoteBodyChanges: task(function *persistNoteBodyChanges(note) {
    yield timeout(BODY_UPDATE_DEBOUNCE_MS);

    this.set('isPersistingChanges', true);
    yield this.get('persistNoteChanges')(note);
    this.set('isPersistingChanges', false);
  }).restartable(),


  init () {
    this._super(...arguments);

    this.exitNote = (typeof this.exitNote === 'function') ? this.exitNote : K;
    this.persistNoteChanges = (typeof this.persistNoteChanges === 'function') ? this.persistNoteChanges : K;
  },


  actions: {

    exitNote () {
      const note = this.get('note');
      this.get('exitNote')(note);
    },

    onNotebookTitleEntered (title) {
      const note = this.get('note');

      note.set('title', title.trim());
      this._persistNoteChanges(note);
    },

    onManualSaveButtonPressed () {
      const note = this.get('note');

      this._persistNoteChanges(note);
    },
  },


  _persistNoteChanges (note) {
    this.set('isPersistingChanges', true);

    this
      .get('persistNoteChanges')(note)
      .then(() => this.set('isPersistingChanges', false));
  },

});
