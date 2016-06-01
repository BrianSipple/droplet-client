import Ember from 'ember';

const { Route, RSVP: { hash } } = Ember;


export default Route.extend({

  model () {
    return hash({
      notebooks: this.store.findAll('notebook'),
    });
  },
});
