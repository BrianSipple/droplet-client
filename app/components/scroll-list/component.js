import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({

  tagName: 'ul',
  classNames: ['c-scroll-list', 'g-list-reset'],


  items: null,

});
