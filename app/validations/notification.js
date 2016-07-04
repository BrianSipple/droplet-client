import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  dismissible: {
    validators: [
      validator('presence', true)
    ]
  },

  isAudible: {
    validators: [
      validator('presence', true)
    ]
  },

  isUnread: {
    validators: [
      validator('presence', true)
    ]
  },

  status: {
    validators: [
      validator('presence', true)
    ]
  },

  type: {
    validators: [
      validator('presence', true)
    ]
  },

  data: {
    validators: [
      validator('presence', true)
    ]
  },

  title: {
    validators: [
      validator('presence', true)
    ]
  },

  user: {
    validators: [
      validator('presence', true)
    ]
  }

});
