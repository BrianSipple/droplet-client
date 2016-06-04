import Ember from 'ember';
import FocasableMixin from 'droplet/mixins/component/focusable';

const {
  Component,
  computed,
  K,
} = Ember;

const { empty, or, sort } = computed;


export default Component.extend(FocasableMixin, {

  classNames: ['c-notes-page-note-card-set', 'u-fill-height', 'u-fill-width'],

  notes: null,
  currentNoteSortProperties: null,
  currentNoteSortOption: null,

  postNewNote: null,

  newNoteProps: null,
  onNoteDataUpdated: null,
  isNewNoteBeingPosted: false, // TODO: Look in to removing and using a droppable task
  newNoteTitleElem: null,
  focusElemSelector: '.js-notes-page__add-note-input',
  isFilteringNotesForSearch: false,
  noteSearchResults: null,


  notesToSort: computed('isFilteringNotesForSearch', 'noteSearchResults.@each', 'notes.@each', function notesToSort () {
    return this.get('isFilteringNotesForSearch') ? this.get('noteSearchResults') : this.get('notes');
  }),

  sortedNotes: sort('notesToSort', 'currentNoteSortProperties'),

  isNewNoteTitleBlank: empty('newNoteProps.title'),
  isAddNoteButtonDisabled: or('isNewNoteTitleBlank', 'isNewNoteBeingPosted'),
  isNotesEmpty: empty('notes'),
  isFocusTargetFocused: empty('notes'),


  init () {
    this._super(...arguments);

    this.newNoteProps = this.newNoteProps || {};
    this.onNoteDataUpdated = (typeof this.onNoteDataUpdated === 'function') ? this.onNoteDataUpdated : K;
  },


  actions: {
    toggleNewNoteForm () {
      this.toggleProperty('isNewNoteModalShowing');
    },

    toggleNoteColorPalette (note) {
      note.toggleProperty('isColorPaletteWidgetShowing');
    },

    onNewNoteFormSubmitted (event) {
      event.preventDefault();

      this.set('isNewNoteBeingPosted', true);
      this
        .get('postNewNote')(this.get('newNoteProps'))
        .then((newNote) => {
          this.get('sortedNotes').pushObject(newNote);
          this.set('newNoteProps', {});
          this.set('isNewNoteBeingPosted', false);
        });
    },


    // async filterNotes (searchInput) {
    //   const searchResults = await this.get('filterNotesFromSearchInput')(searchInput);
    //
    //   run.once(this, () => {
    //     this.set('noteSearchResults', searchResults);
    //     this.set('isFilteringNotesForSearch', true);
    //   });
    // },
    //
    // searchDidExit () {
    //   this.set('isFilteringNotesForSearch', false);
    // }
  }
});
