import Ember from 'ember';

const {
  computed,
  K,
  Component,
} = Ember;

const { sort, bool } = computed;


export default Component.extend({

  classNames: ['c-dashboard-page'],

  notebooks: null,
  onAddNewNotebook: null,
  tasks: null,

  isNotebookFormActivated: null,

  notebooksSortingDesc: ['lastUpdatedAt:desc'],
  notebooksByMostRecent: sort('notebooks', 'notebooksSortingDesc'),
  isNewNotebookBeingPosted: bool('tasks.addNotebook.isRunning'),

  init () {
    this._super(...arguments);

    this.notebooks = this.notebooks || [];
    this.onAddNewNotebook = (typeof this.onAddNewNotebook === 'function') ? this.onAddNewNotebook : K;
  },


  didReceiveAttrs () {
    this._super(...arguments);

    // set this on `didRecieveAttrs` so that it can become false every time
    // we refresh the route
    this.set('isNotebookFormActivated', false);
  },



  actions: {

    toggleNewNotebookForm () {
      this.toggleProperty('isNotebookFormActivated');
    },

    addNewNotebook (notebookProperties) {
      this.get('onAddNewNotebook')(notebookProperties);
    },
  },

});
