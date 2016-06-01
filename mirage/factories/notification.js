import { Factory } from 'ember-cli-mirage';
import moment from 'moment';

const NOTIFICATION_TYPES = [
  'success',
  'error',
  'warning',
  'reminder',
];

const NOTIFICATION_STATUSES = [
  'notification',
  'alert',
];

export default Factory.extend({

  dismissible() {
    return Math.round(Math.random()) ? true : false;
  },

  audible() {
    return Math.round(Math.random()) ? true : false;
  },

  status () {
    return faker.list.random(NOTIFICATION_STATUSES);
  },

  type () {
    return faker.list.random(NOTIFICATION_TYPES);
  },

  message () {
    return faker.lorem.sentence(1);
  },

  title () {
    return faker.lorem.words(Math.floor(Math.random() * 5));
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days');
  },
});
