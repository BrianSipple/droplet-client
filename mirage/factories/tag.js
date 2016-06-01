import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';


export default Factory.extend({

  name() {
    return faker.lorem.words(Math.floor(Math.random() * 3));
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days');
  },
});
