import Ember from 'ember';
import FocusableMixin from 'droplet/mixins/component/focusable';

const {
  Component,
  K,
  get,
  computed: { sort },
} = Ember;


export default Component.extend(FocusableMixin, {

  notebooks: null,
  notebookSortProperties: ['lastUpdatedAt:desc'],
  onNotebookItemSelected: null,
  isShowingNewNotebookItemForm: false,
  postNewNotebook: null,
  sortedNotebooks: sort('notebooks', 'notebookSortProperties'),
  isPostingNewNotebookItem: false,
  newNotebookTitle: '',


  init () {
    this._super(...arguments);

    this.onNotebookItemSelected = (typeof this.onNotebookItemSelected === 'function') ? this.onNotebookItemSelected : K;
    this.postNewNotebook = (typeof this.postNewNotebook === 'function') ? this.postNewNotebook : K;
  },


  actions: {

    onNotebookItemSelected (notebook) {
      this.get('onNotebookItemSelected')(notebook);
    },

    addNewNotebook (notebookTitle) {
      this.set('isPostingNewNotebookItem', true);

      this
        .get('postNewNotebook')({ title: notebookTitle })
        .then(newNotebook => {
          this.set('isPostingNewNotebookItem', false);
          // TODO: Decide whether or not to transition immediately after creation (right now, I'm on the side of not)
          // this.get('onNotebookItemSelected')(get(newNotebook, 'id'));
        });
    },
  },

});
