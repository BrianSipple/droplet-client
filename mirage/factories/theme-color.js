import { Factory } from 'ember-cli-mirage';

const { floor, random } = Math;


export default Factory.extend({

  hue () {
    return floor(random() * 361);
  },

  saturation () {
    return floor(random() * 101);
  },

  lightness () {
    return floor(random() * 101);
  },

  alpha () {
    // return random();
    return 1;
  },

});
