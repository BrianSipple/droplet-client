import Ember from 'ember';

const {
  Mixin,
  isBlank,
  run,
} = Ember;

/**
 * Observer-free attritube-update-based focus toggling
 */
export default Mixin.create({

  _elementToFocus: null,
  focusElemSelector: null, // optional selector for toggling a nested element

  focusWhen: null, // set this as an attribute so that we can toggle appropriately on `didUpdateAttrs`


  /* eslint-disable no-unused-expressions */

  handleFocusing () {
    const _elementToFocus = this._elementToFocus;

    this.get('focusWhen') ? _elementToFocus.focus() : _elementToFocus.blur();
  },

  /* eslint-enable no-unused-expressions */


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

  },


  didReceiveAttrs() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, 'handleFocusing');
  },


  willDestroyElement () {
    this._super(...arguments);

    this._elementToFocus = null;
  },

});
