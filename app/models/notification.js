import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import NotificationValidations from 'droplet/validations/notification';



export default Model.extend(NotificationValidations, {

  /* -----  "Own" Data Attributes  ----- */
  isDismissible: attr('boolean', { defaultValue: true }),
  isAudible: attr('boolean', { defaultValue: false }),
  isUnread: attr('boolean', { defaultValue: true }),

  status: attr('string'),
  type: attr('string'),
  title: attr('string'),
  data: attr('string'),

  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),


  /* -----  Relationship Attributes  ----- */
  user: belongsTo('user'),

  note: belongsTo('note'), // optional
  notebook: belongsTo('note'), // optional
});
