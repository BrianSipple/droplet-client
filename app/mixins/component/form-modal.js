import Ember from 'ember';

const { Mixin, run, K } = Ember;


export default Mixin.create({

  selectorForFocus: '', // Override this
  onSubmit: null,

  init () {
    this._super(...arguments);

    this.onSubmit = (typeof this.onSubmit === 'function') ? this.onSubmit : K;
  },


  didInsertElement () {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, () => {
      this.focusFormAfterInsertion();
    });
  },


  focusFormAfterInsertion () {
    const elemToFocus = this.element.querySelector(this.get('selectorForFocus'));

    if (elemToFocus && typeof elemToFocus.focus === 'function') {
      elemToFocus.focus();
    }
  },

});
