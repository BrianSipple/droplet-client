import Ember from 'ember';

const { Route } = Ember;


export default Route.extend({

  actions: {

    didTransition () {
      const notebook = this.currentModel.notebook;

      if (notebook) {
        document.title = `Droplet: ${notebook.get('title')}`;
      }

    },

  },
});
