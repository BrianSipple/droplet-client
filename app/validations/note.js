import { validator, buildValidations } from 'ember-cp-validations';


export default buildValidations({

  priority: {
    validators: [
      validator('number', {
        integer: true,
        gte: 1,
        lte: 5
      })
    ]
  }
});
