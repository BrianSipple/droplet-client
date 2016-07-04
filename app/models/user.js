import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import UserValidations from 'droplet/validations/user';


// TODO: Standalone hash for "private" data members: http://miguelcamba.com/blog/2015/03/15/optimizing-apis-with-ember-data-and-embeddedrecordsmixin/
export default Model.extend(UserValidations, {

  /* -----  "Own" Data Attributes  ----- */
  firstName: attr('string'),
  lastName: attr('string'),
  username: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  twitterUsername: attr('string'),
  avatarURL: attr('string'),
  bio: attr('string'),
  location: attr('string'),
  accessibility: attr('string'),
  language: attr('string', { defaultValue: 'en_US' }),
  lastLogin: attr('utc'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),

  /* ----- Relationship Attributes ----- */

  // notes: hasMany('note'),  // Comment out for now and experiement with only keeping notes on notebooks
  userPrivateInfo: belongsTo('user-private-info'),

  notebooks: hasMany('notebook', {
    inverse: 'owner',
    defaultValue: () => [],
  }),

  tags: hasMany('tag', { defaultValue: () => [] }),


  /* ----- Computed Attributes ----- */


  /**
   * NOTE: Current hunch when we start on validation: store password on the backend only
   * (but still be able to access it here in the client, even if
   * it's not defined on the model)
   */

});
