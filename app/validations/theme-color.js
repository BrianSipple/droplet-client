import { validator, buildValidations } from 'ember-cp-validations';


export default buildValidations({

  hue: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive: true,
      integer: true,
      gte: 0,
      lte: 360,
    }),
  ],

  saturation: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      positive: true,
      integer: true,
      gte: 0,
      lte: 360,
    }),
  ],

  lightness: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      integer: true,
      gte: 0,
      lte: 100,
    }),
  ],

  alpha: [
    validator('presence', true),
    validator('number', {
      allowString: true,
      gte: 0,
      lte: 1,
    }),
  ],


  // TODO: Make a custom validator for "hue" and "percentage"?
});
