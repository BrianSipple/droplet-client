import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';
import authConstants from 'droplet/utils/constants/auth';

const { roles: userRoles } = authConstants;
const { floor, random } = Math;


export default Factory.extend({

  firstName() {
    return faker.name.firstName();
  },

  lastName() {
    return faker.name.lastName();
  },

  username(i) {
    return `User${i}`;
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days');
  },

  avatarURL() {
    return faker.internet.avatar();
  },

  role() {
    const roleKeys = Object.keys(userRoles);
    const roleKey = roleKeys[floor(random() * roleKeys.length)];

    return userRoles[roleKey];
  },

  afterCreate(user, server) {
    server.createList('notebook', 10, { ownerId: user.id });
    server.createList('notification', 5, { userId: user.id });
  }
});
