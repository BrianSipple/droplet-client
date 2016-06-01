import Ember from 'ember';

const {
  Component,
} = Ember;


export default Component.extend({

  tagName: 'section',
  classNames: ['c-toolbar', 'o-toolbar'],

  /*
   * Optional component names to render as navar "option items"
   */
  itemComponentNames: null,

});
