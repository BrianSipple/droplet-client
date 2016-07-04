import Ember from 'ember';

const { Mixin, K } = Ember;


export default Mixin.create({

  onPressed: null,


  init () {
    this._super(...arguments);
    this.onPressed = (typeof this.onPressed === 'function') ? this.onPressed : K;
  },


  click(ev) {
    ev.preventDefault();

    this.get('onPressed')();
  }
});
