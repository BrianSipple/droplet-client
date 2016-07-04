import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const {
  Component,
  computed,
  inject: { service },
  get
} = Ember;

const { readOnly } = computed;


export default Component.extend({
  NotebookPageService: service('notebook-page'),
  classNames: ['c-notebooks-notebook-page', 'u-fill-width', 'u-fill-height'],

  notebook: null,
  notes: readOnly('notebook.notes'),
  navLinks: readOnly('NotebookPageService.navLinks'),
  activeRouteName: readOnly('NotebookPageService.activeRoute'),
  noteSearchResults: readOnly('NotebookPageService.noteSearchResults'),

  isFilteringNotesForSearch: false,

  noteSearchInputTask: task(function *handleNoteSearchInput(searchInput) {
    yield timeout(400);

    const notes = this.get('notes');

    try {
      yield this.get('NotebookPageService').filterNotesFromSearchInput(searchInput, notes);
      
    } catch(e) {
      throw Error(`Error while filtering notes from search input: ${e}`);
    }
  }),

  activeLinkIndex: computed('navLinks.[]', 'activeRouteName', {
    get() {
      const activeRouteName = this.get('activeRouteName');
      const navLinks = this.get('navLinks');

      return navLinks.findIndex(linkItem => activeRouteName.search(get(linkItem, 'routeName')) > -1);
    }
  })
});
