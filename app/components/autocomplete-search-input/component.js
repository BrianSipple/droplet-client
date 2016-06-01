import Ember from 'ember';

const { K, run, isPresent, TextField, computed: { bool, alias } } = Ember;


// export default Component.extend({
export default TextField.extend({
  // attributeBindings: ['placeholder', 'value', 'type'],
  attributeBindings: [
    'aria-owns'
  ],

  type: 'text',

  isAutocomplete: true,
  owningListId: null,
  'on-input': null,
  'on-blur': null,


  autocomplete: bool('isAutocomplete'),

  'aria-owns': alias('owningListId'),


  input (event) {
    event.preventDefault();

    this
      .get('on-input')(event.target.value)
      .then(({ highlightStart, highlightEnd }) => {
        if (isPresent(highlightStart) && isPresent(highlightEnd)) {
          run.scheduleOnce('afterRender', this, () => this.element.setSelectionRange(highlightStart, highlightEnd));
        }
      });
  },

  focusOut (event) {
    event.preventDefault();
    this.get('on-blur')();
  },


  init () {
    this._super(...arguments);

    this['on-input'] = (typeof this['on-input'] === 'function') ? this['on-input'] : K;
    this['on-blur'] = (typeof this['on-blur'] === 'function') ? this['on-blur'] : K;
  },

});
