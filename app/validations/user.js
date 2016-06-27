import { validator, buildValidations } from 'ember-cp-validations';

const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/;

const messages = {
  passwordPattern: `{description} must include at least one number,
  one lowercase letter, and one uppercase letter`
};

export default buildValidations({
  username: {
    debounce: 650,
    validators: [
      validator('presence', true),
      validator('length', { max: 22 }),
      validator('unique-username')
    ]
  },

  password: {
    debounce: 650,
    description: 'Password',
    validators: [
      validator('presence', true),
      validator('length', { min: 6, max: 14 }),
      validator('format', {
        regex: PASSWORD_PATTERN,
        message: messages.passwordPattern
      })
    ]
  },

  passwordConfirmation: {
    debounce: 650,
    validators: [
      validator('presence', true),
      validator('format', {
        regex: PASSWORD_PATTERN,
        message: messages.passwordPattern
      }),
      validator('confirmation', {
        on: 'password',
        message: '{description} do not match',
        descriptions: 'Passwords'
      })
    ]
  },

  userPrivateInfo: {
    validators: [
      validator('presence', true),
      validator('belongs-to')
    ]
  }
});
