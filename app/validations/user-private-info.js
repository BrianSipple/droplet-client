import { validator, buildValidations } from 'ember-cp-validations';
import authConstants from 'droplet/utils/constants/auth';

const { subscriptionTypes } = authConstants;


export default buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' }),
  ],
  subscriptionType: [
    validator('presence', true),
    validator('inclusion', { in: Object.values(subscriptionTypes) }),
  ],
});
