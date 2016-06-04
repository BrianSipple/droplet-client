import { validator, buildValidations } from 'ember-cp-validations';
import authConstants from 'droplet/utils/constants/auth';

const { subscriptionTypes } = authConstants;


export default buildValidations({
  email: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('format', { type: 'email' })
    ]
  },

  subscriptionType: {
    validators: [
      validator('presence', true),
      validator('inclusion', { in: Object.values(subscriptionTypes) })
    ]
  }
});
