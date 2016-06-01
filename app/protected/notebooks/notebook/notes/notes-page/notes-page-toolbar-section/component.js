import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, K } = Ember;


export default Component.extend({

  tagName: 'section',
  classNames: ['c-notes-page-card-set-section'],

  notes: null,
  toolbarSize: null,
  noteSortOptions: null,
  currentNoteSortOption: null,
  isFilteringNotesForSearch: false,
  onNoteSearchActivated: null,
  onSearchExited: null,
  noteSearchResults: null,

  init () {
    this._super(...arguments);

    this.onFilterNotesForSearch = (typeof this.onFilterNotesForSearch === 'function') ? this.onFilterNotesForSearch : K;
    this.onSearchExited = (typeof this.onSearchExited === 'function') ? this.onSearchExited : K;
  },

  noteSearchInputTask: task(function *handleNoteSearchInput(searchInput) {
    yield timeout(400);

    try {
      yield this.get('onFilterNotesFromSearchInput')(searchInput);
    }
    catch (e) {
      throw Error(`Error while filtering notes from search input: ${e}`);
    }
  }),

  actions: {
    searchDidExit () {
      this.get('onSearchExited')();
    }
  }

});
