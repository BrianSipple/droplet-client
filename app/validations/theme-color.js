import { validator, buildValidations } from 'ember-cp-validations';


export default buildValidations({

  hue: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        positive: true,
        integer: true,
        gte: 0,
        lte: 360,
      }),
    ]
  },

  saturation: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        positive: true,
        integer: true,
        gte: 0,
        lte: 360
      })
    ]
  },

  lightness: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        integer: true,
        gte: 0,
        lte: 100,
      })
    ]
  },

  alpha: {
    validators: [
      validator('presence', true),
      validator('number', {
        allowString: true,
        gte: 0,
        lte: 1,
      })
    ]
  },


  // TODO: Make a custom validator for "hue" and "percentage"?
});
