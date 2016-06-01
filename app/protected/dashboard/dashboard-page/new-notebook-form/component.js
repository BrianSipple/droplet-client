import Ember from 'ember';
import FormModalMixin from 'droplet/mixins/component/form-modal';

const {
  Component,
  Object: EmberObject,
} = Ember;


export default Component.extend(FormModalMixin, {

  notebookProperties: null,
  isNewNotebookBeingPosted: false,
  selectorForFocus: '.js-input--notebook-title',


  init () {
    this._super(...arguments);

    this.notebookProperties = this.notebookProperties || EmberObject.create();
  },

  actions: {

    onSubmit(notebookProperties) {
      this.get('onSubmit')(notebookProperties);
    },

  },
});
