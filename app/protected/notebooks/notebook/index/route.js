import Ember from 'ember';

const { Route, inject: { service } } = Ember;


export default Route.extend({

  NotebookPageService: service('notebook-page'),

  beforeModel() {
    this.transitionTo(this.get('NotebookPageService.activeRoute'));
  },

  actions: {
    didTransition () {
      const notebook = this.currentModel.notebook;

      if (notebook) {
        document.title = `Droplet: ${notebook.get('title')}`;
      }
    }
  }
});
