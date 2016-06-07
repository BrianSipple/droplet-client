import Ember from 'ember';

const { Component, K, computed: { not } } = Ember;


export default Component.extend({

  classNames: ['c-alert-box', 'u-relative', 'u-pt2', 'u-pr3', 'u-pb2', 'u-pl3'],
  classNameBindings: ['isOpen'],
  attributeBindings: ['aria-hidden'],

  ariaRole: 'alert',
  isOpen: false,


  'aria-hidden': not('isOpen'),


  init () {
    this._super(...arguments);

    this.onClose = (typeof this.onClose === 'function') ? this.onClose : K;
  },


  onClose: null,


  actions: {
    closeButtonClicked () {
      this.set('isOpen', false);
      this.get('onClose')();
    }
  }

});
