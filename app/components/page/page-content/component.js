import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({

  classNames: ['c-page-content', 'o-content'],

  classNameBindings: [
    'fillHeight:u-fill-height',
    'fillWidth:u-fill-width',
    'isRelative:u-relative',
  ],

  fillHeight: true,
  fillWidth: true,
  isRelative: true,

});
