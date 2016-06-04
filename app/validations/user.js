import { validator, buildValidations } from 'ember-cp-validations';

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.[A-Z]).{6,14}$/;


export default buildValidations({
  username: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('length', { max: 22 }),
      validator('unique-username')
    ]
  },

  password: {
    debounce: 500,
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', { min: 6, max: 14 }),
      validator('format', {
        regex: PASSWORD_PATTERN,
        message: `{description} must include at least...`
      })
    ]
  },

  passwordConfirmation: {
    debounce: 500,
    validators: [
      validator('presence', true),
      validator('format', {
        regex: PASSWORD_PATTERN,
        message: `{description} must include at least...`
      }),
      validator('confirmation', {
        on: 'password',
        message: '{description} do not match',
        descriptions: 'Passwords',
      }),
    ]
  },

  userPrivateInfo: {
    validators: [
      validator('belongs-to')
    ]
  }
});
