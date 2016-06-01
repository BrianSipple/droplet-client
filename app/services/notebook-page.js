import Ember from 'ember';

const {
  Service,
  inject: { service },
} = Ember;


export default Service.extend({

  store: service(),

  noteSearchResults: null,
  navLinks: [
    { routeName: 'protected.notebooks.notebook.notes', title: 'Notes' },
    { routeName: 'protected.notebooks.notebook.activity', title: 'Activity' }
  ],


  /**
   * TODO: Improve the current "search algorithm"?
   */
  filterNotesFromSearchInput (searchInput, notes) {
    const toMatch = new RegExp(`^${searchInput}`, 'i');

    const results = notes.filter(note => toMatch.test(note.get('title')));
    this.set('noteSearchResults', results);

    return results;
  },
});
