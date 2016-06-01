import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Route } = Ember;


export default Route.extend({
  queryParams: {
    sortBy: {
      refreshModel: true,
      replace: true,  // prevents an additional item from being added to browser history
      as: 'sort',
    },
    search: {
      refreshModel: false,
      replace: true,
      as: 'search',
    },
  },


  model ({ sortBy }) {
    const notebook = this.modelFor('protected.notebooks.notebook.notes');

    if (sortBy) {
      // only update the `currentNoteSortParam` if a new one was given
      notebook.set('currentNoteSortParam', sortBy);
    }
    return notebook;
  },


  actions: {
    noteSortingDidChange (selectedOptionItem) {
      this.transitionTo(this.routeName, {
        queryParams: { sortBy: selectedOptionItem.code },
      });
    },
  }
});
