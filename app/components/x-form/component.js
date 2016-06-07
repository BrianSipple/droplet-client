import Ember from 'ember';

const { Component, K } = Ember;


export default Component.extend({

  tagName: 'form',
  classNames: ['u-m0', 'u-overflow-hide', 'u-b-box'],
  attributeBindings: ['autocomplete', 'novalidate', 'method'],

  autocomplete: 'on',
  novalidate: 'novalidate',
  method: 'post',

  init () {
    this._super(...arguments);

    this.onSubmit = (typeof this.onSubmit === 'function') ? this.onSubmit : K;
  }
});
