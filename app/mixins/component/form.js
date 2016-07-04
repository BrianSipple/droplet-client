import Ember from 'ember';

const { Mixin, K } = Ember;

export default Mixin.create({
  tagName: 'form',
  classNames: ['u-m0', 'u-overflow-hide'],
  attributeBindings: ['autocomplete', 'novalidate', 'method'],

  autocomplete: 'on',
  novalidate: 'novalidate',
  method: 'post',

  onSubmit: null,

  init() {
    this._super(...arguments);

    this.onSubmit = (typeof this.onSubmit === 'function') ? this.onSubmit : K;
  },


  submit(ev) {
    ev.preventDefault();

    this.get('onSubmit')();
  }

});
