import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';


export default Model.extend({

  /* -----  "Own" Data Attributes  ----- */
  name: attr('String'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),


  /* ----- Relationship Attributes ----- */
  notes: hasMany('note', { defaultValue: () => [] }),
  user: belongsTo('user'),

});
