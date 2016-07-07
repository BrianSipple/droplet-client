import Ember from 'ember';
import PageContentComponent from 'droplet/components/page/page-content/component';
import { task, timeout } from 'ember-concurrency';

const { K, computed, inject: { service } } = Ember;
const BODY_UPDATE_DEBOUNCE_MS = 1200;


export default PageContentComponent.extend({
  NotePageService: service('note-page'),
  classNames: ['c-note-page'],

  isMarkdownPreviewVisible: false,
  onExitNote: null,
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

    this.onExitNote = (typeof this.onExitNote === 'function') ? this.onExitNote : K;
    this.persistNoteChanges = (typeof this.persistNoteChanges === 'function') ? this.persistNoteChanges : K;
  },


  actions: {

    exitNote() {
      const note = this.get('note');
      this.get('onExitNote')(note);
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
