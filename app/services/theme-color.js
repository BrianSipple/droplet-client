import Ember from 'ember';

const { Service, inject: { service } } = Ember;


export default Service.extend({

  store: service(),

  noteThemeColors: [],

  init () {
    this._super(...arguments);

    const store = this.get('store');
    this.set('noteThemeColors', store.findAll('theme-color'));
  },

});
