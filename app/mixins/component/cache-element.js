import Ember from 'ember';

const { Mixin, assert } = Ember;


export default Mixin.create({

  cachedDOMElemPropName: '_cachedElement',


  didInsertElement () {
    this._super(...arguments);
    this._cacheDOMElement();
  },

  willDestroyElement () {
    this._super(...arguments);
    this._removeDOMElement();
  },


  _cacheDOMElement () {
    const elementToCache = this.element;

    assert(
      'cacheDOMElement Mixin: No DOM element found on the current context',
      this.element && this.element instanceof HTMLElement
    );

    this.set(this.get('cachedDOMElemPropName'), elementToCache);
  },

  _removeDOMElement () {
    this.set(this.get('cachedDOMElemPropName'), undefined);
  },


});
