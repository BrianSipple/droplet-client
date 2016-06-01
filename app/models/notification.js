import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';


export default Model.extend({

  /* -----  "Own" Data Attributes  ----- */
  dismissible: attr('boolean', { defaultValue: true }),
  audible: attr('boolean', { defaultValue: false }),
  status: attr('string'),
  type: attr('string'),
  message: attr('string'),
  title: attr('string'),

  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),


  /* -----  Relationship Attributes  ----- */
  user: belongsTo('user'),
});
