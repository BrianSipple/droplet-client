import Ember from 'ember';

const { computed, defineProperty, mixin, Mixin } = Ember;

const {
  oneWay,
  alias,
  not,
  and,
  notEmpty
} = computed;


export default Mixin.create({

  model: null,
  value: null,
  valuePath: null,

  isTyping: false,
  validation: null,

  init () {
    this._super(...arguments);

    const valuePath = this.get('valuePath');

    defineProperty(this, 'value', alias(`model.${valuePath}`));
    defineProperty(this, 'validation', oneWay(`model.validations.attrs.${valuePath}`));
  },

  notValidating: not('validation.isValidating'),
  didValidate: oneWay('validation.didValidate'),
  hasContent: notEmpty('value'),
  isValid: and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: oneWay('validation.isInvalid'),
  showErrorClass: and('notValidating', 'showMessage', 'hasContent', 'validation'),

  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function shouldShowMessage() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  })

});
