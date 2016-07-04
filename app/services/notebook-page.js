import Ember from 'ember';

const {
  Service,
  inject: { service },
} = Ember;

const ROUTE_NAMES = {
  NOTES: 'protected.notebooks.notebook.notes',
  ACTIVITY: 'protected.notebooks.notebook.activity'
};

export default Service.extend({
  store: service(),

  activeRoute: ROUTE_NAMES.NOTES,

  noteSearchResults: null,

  navLinks: [
    { routeName: ROUTE_NAMES.NOTES, title: 'Notes' },
    { routeName: ROUTE_NAMES.ACTIVITY, title: 'Activity' }
  ],

  // TODO: isFilteringNotesForSearch property?


  /**
   * TODO: Improve the current "search algorithm"?
   */
  filterNotesFromSearchInput (searchInput, notes) {
    const toMatch = new RegExp(`^${searchInput}`, 'i');

    const results = notes.filter(note => toMatch.test(note.get('title')));
    this.set('noteSearchResults', results);

    return results;
  },

  setActiveRoute(routeName) {
    if (this.get('navLinks').any(link => link.routeName === routeName)) {
      this.set('activeRoute', routeName);
    }
  }
});
