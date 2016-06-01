import Ember from 'ember';

const {
  Component,
  computed: { alias },
  computed: { sort },
} = Ember;


export default Component.extend({
  tagName: 'section',
  classNames: ['c-switchblade-menu-details-flyup'],
  classNameBindings: ['isContentVisible:content-visible'],

  notebook: null,
  isContentVisible: false,
  headerTitle: null,

  noteSorting: ['lastUpdatedAt:desc'],
  sortedNotes: sort('notebook.notes', 'noteSorting'),


  actions: {

    onNoteSelected () {
      debugger;
    },

  },



});
