import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

const { floor, random } = Math;

export default Factory.extend({
  title() {
    return faker.random.words();
  },

  priority(i) {
    return floor((random() * 5) + 1);
  },

  content(i) {
    return faker.lorem.paragraphs(i + 1);
  },

  revisionCount () {
    return faker.random.number(0, 1000);
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days')
  },
});
