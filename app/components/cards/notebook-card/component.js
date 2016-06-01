import Ember from 'ember';
import SavvyBoxShadowClassMixin from 'droplet/mixins/component/savvy-box-shadow';

const { Component, K } = Ember;


export default Component.extend(SavvyBoxShadowClassMixin, {

  classNames: ['c-notebook-card', 'o-content'],

  notebook: null,
  onDoubleClick: null,

  init () {
    this._super(...arguments);

    this.onDoubleClick = this.onDoubleClick || K;
  },


  doubleClick(ev) {
    this.get('onDoubleClick')();
  },

});
