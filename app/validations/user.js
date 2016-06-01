import { validator, buildValidations } from 'ember-cp-validations';


export default buildValidations({
  username: [
    validator('presence', true),
    validator('unique-username'),
  ],
  password: [
    validator('presence', true),
    validator('length', { min: 6, max: 14 }),
  ],
  passwordConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'password',
      message: '{description} do not match',
      descriptions: 'Passwords',
    }),
  ],
});
