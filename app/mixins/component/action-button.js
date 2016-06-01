import Ember from 'ember';

const { K, Mixin } = Ember;


export default Mixin.create({

  onPressed: null,

  init () {
    this._super(...arguments);

    this.onPressed = (typeof this.onPressed === 'function') ? this.onPressed : K;
  },

  /*
   * Calls any any bound `onPressed` handler
   *
   * TIP:
   * Curry any arguments that you'd like your handler to be called with by
   * using the `action helper` in your template:
   *
   *    {{x-button onPressed=(action 'fireCannons' '42' currentEnemies)}}
   */
  click (event) {
    event.stopPropagation();
    this.get('onPressed')();
  },

});
