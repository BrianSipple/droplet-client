import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

const NOTIFICATION_TYPES = [
  'notification',
  'alert',
  'reminder',
  'info',
  'help'
];

const NOTIFICATION_STATUSES = [
  'success',
  'error',
  'warning',
  'info'
];

export default Factory.extend({

  isDismissible() {
    return !!(Math.round(Math.random()));
  },

  isAudible() {
    return !!(Math.round(Math.random()));
  },

  isUnread() {
    return !!(Math.round(Math.random()));
  },

  status() {
    return faker.list.random(NOTIFICATION_STATUSES);
  },

  type() {
    return faker.list.random(NOTIFICATION_TYPES);
  },

  data() {
    return faker.lorem.sentence(1);
  },

  title() {
    return faker.lorem.words(Math.floor(Math.random() * 5));
  },

  createdAt(i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt(i) {
    return moment().subtract(i, 'days');
  },
});
