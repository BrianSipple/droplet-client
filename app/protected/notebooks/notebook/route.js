import Ember from 'ember';

const { Route, inject: { service } } = Ember;


export default Route.extend({

  NotebookPageService: service('notebook-page'),

  actions: {
    willTransition({ intent: { name: transitionTargetName } }) {
      this.get('NotebookPageService').setActiveRoute(transitionTargetName);
    }
  }
});
