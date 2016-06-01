import Ember from 'ember';

const { Mixin, isBlank, run } = Ember;


export default Mixin.create({

  isFocusTargetFocused: null,  // set this value in your extending object to control the focus behavior
  focusElemSelector: null,   // set this value in your extending object to control what element gets acted upon
  _elementToFocus: null,


  handleFocusing (elementToFocus) {
    run.scheduleOnce('afterRender', this, () => {
      if (this.get('isFocusTargetFocused')) {
        elementToFocus.focus();
      } else {
        elementToFocus.blur();
      }
    });
  },


  didInsertElement() {
    this._super(...arguments);

    // cache the targeted DOM element -- either by using the provided selector
    // or defaulting to the element that the mixin was applied to
    const focusElemSelector = this.get('focusElemSelector');

    if (!isBlank(focusElemSelector)) {
      this._elementToFocus = this.element.querySelector(focusElemSelector);
    } else {
      this._elementToFocus = this.element;
    }

    this.handleFocusing(this._elementToFocus);
  },


  didReceiveAttrs() {
    this._super(...arguments);

    const elementToFocus = this._elementToFocus;

    if (elementToFocus) {
      this.handleFocusing(elementToFocus);
    }
  },

  willDestroyElement () {
    this._super(...arguments);

    this._elementToFocus = null;
  },
});
