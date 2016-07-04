import Ember from 'ember';

const {
  Component,
  isArray,
  K,
  A,
  get,
} = Ember;


export default Component.extend({
  tagName: 'select',
  attributeBindings: ['multiple', 'disabled'],

  optionClassNames: null,
  content: null,
  onSelectionChanged: null,
  selectedOption: null,
  optionDisabledKey: null,
  optionLabelKey: null,
  prompt: null,
  promptClassNames: null,
  multiple: false,
  disabled: false,


  init () {
    this._super(...arguments);

    this.content = isArray(this.content) ? this.content : A([]);
    this.onSelectionChanged = (typeof this.onSelectionChanged === 'function') ? this.onSelectionChanged : K;
  },


  change (event) {
    event.preventDefault();
    this.send('selectionDidChange', event.target);
  },


  actions: {

    /**
     * Handle the change event for our options.
     *
     * If multiple select is enabled, we'll return an array.
     * If not, we'll return a single value
     */
    selectionDidChange (selectElem) {
      const selectedValue = selectElem.value;
      const optionValueKey = this.get('optionValueKey');
      const optionItems = this.get('content');

      let fullSelection;

      if (this.get('isMultiple')) {
        const selectedValues = A(selectedValue);

        let optionItemValue;
        fullSelection = optionItems.filter(optionItem => {
          optionItemValue = get(optionItem, optionValueKey).toString();

          return selectedValues.contains(optionItemValue);
        });

      } else {
        fullSelection = optionItems.find(optionItem => {
          return get(optionItem, optionValueKey).toString() === selectedValue;
        });
      }
      
      this.get('onSelectionChanged')(fullSelection);
    }
  }
});
