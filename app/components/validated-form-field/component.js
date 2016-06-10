import Ember from 'ember';
import XFormField from 'droplet/components/x-form-field/component';
import ValidatedFormFieldMixin from 'droplet/mixins/component/validated-form-field';


export default XFormField.extend(ValidatedFormFieldMixin, {
  classNames: ['c-validated-form-field', 'o-flex-grid', 'o-flex-grid--full'],

  placeholder: null,
  fieldType: null,
  testSelector: null,
  inputClassNames: null,
  labelClassNames: null,
  label: null,
});
