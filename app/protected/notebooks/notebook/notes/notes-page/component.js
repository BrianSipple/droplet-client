import Ember from 'ember';
import PageContentComponent from 'droplet/components/page/page-content/component';
import FocasableMixin from 'droplet/mixins/component/focusable';


const {
  computed,
  inject: { service },
  K
} = Ember;

const { readOnly, sort, empty, or } = computed;


export default PageContentComponent.extend(FocasableMixin, {
  NotebookPageService: service('notebook-page'),  // TODO: Drive a lot of the data with this
  classNames: ['c-notes-page'],

  focusElemSelector: '.js-notebook-notes-page__add-note-input',

  notes: null,
  noteSortOptions: null,
  currentNoteSortOption: null,
  currentNoteSortProperties: null,
  postNewNote: null,

  newNoteProps: null,
  isFilteringNotesForSearch: false,
  isNewNoteBeingPosted: false, // TODO: Look in to removing and using a droppable task

  isNewNoteTitleBlank: empty('newNoteProps.title'),
  isAddNoteButtonDisabled: or('isNewNoteTitleBlank', 'isNewNoteBeingPosted'),
  isFocusTargetFocused: empty('notes'), // focus on the new note input if we don't have anything yet

  noteSearchResults: readOnly('NotebookPageService.noteSearchResults'),

  notesToSort: computed('isFilteringNotesForSearch', 'noteSearchResults.@each', 'notes.@each', function notesToSort () {
    return this.get('isFilteringNotesForSearch') ? this.get('noteSearchResults') : this.get('notes');
  }),

  sortedNotes: sort('notesToSort', 'currentNoteSortProperties'),


  init () {
    this._super(...arguments);

    this.newNoteProps = {};
    this.postNewNote = (typeof this.postNewNote === 'function') ? this.postNewNote : K;
  },

  actions: {
    newNoteEntered(noteProps) {
      this
        .get('postNewNote')(noteProps)
        .then(() => this.set('newNoteProps', {}));
    }
  }
});
