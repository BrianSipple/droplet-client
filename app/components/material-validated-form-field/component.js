import Ember from 'ember';
import XFormField from 'droplet/components/x-form-field/component';
import ValidatedFormFieldMixin from 'droplet/mixins/component/validated-form-field';

const { computed } = Ember;
const { alias } = computed;


export default XFormField.extend(ValidatedFormFieldMixin, {
  classNames: ['c-material-validated-form-field'],

  model: null,
  valuePath: null,
  label: null,
  fieldType: 'text',
  placeholder: null,
  materialInputClassNames: null,


  for: alias('label'),

  materialInputComponentName: computed('fieldType', {
    get() {
      const fieldType = this.get('fieldType');

      return {
        text: 'material-text-input',
        email: 'material-text-input',
        search: 'material-text-input',
        tel: 'material-text-input'
      }[fieldType];
    }

  })

});
