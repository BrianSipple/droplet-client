import { validator, buildValidations } from 'ember-cp-validations';


export default buildValidations({

  title: {
    validators: [
      validator('length', {
        max: 100,
      }),
      validator('unique-notebook-name')
    ]
  },
});
