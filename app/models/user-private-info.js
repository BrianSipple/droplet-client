import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import UserPrivateInfoValidations from 'droplet/validations/user-private-info';
import authConstants from 'droplet/utils/constants/auth';

const { roles: userRoles, subscriptionTypes } = authConstants;


export default Model.extend(UserPrivateInfoValidations, {

  email: attr('string'),
  subscriptionType: attr('string', { defaultValue: subscriptionTypes.FREE_BASIC }),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),
  role: attr('string', { defaultValue: userRoles.REGISTERED_USER }),

  /* ----- Relationship Attributes ----- */
  user: belongsTo('user')

});
