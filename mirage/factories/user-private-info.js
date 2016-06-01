import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';
import authConstants from 'droplet/utils/constants/auth';

const { roles: userRoles, subscriptionTypes } = authConstants;


export default Factory.extend({

  email () {
    return faker.internet.email();
  },
  subscriptionType () {
    return faker.list.random(Object.values(subscriptionTypes));
  },
  role () {
    return faker.list.random(Object.values(userRoles));
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days');
  },
});
