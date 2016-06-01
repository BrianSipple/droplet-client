import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import makeDate from 'droplet/utils/make-date';


export default Model.extend({

  /* ----- Own-Data Attributes ----- */
  title: attr('string'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),


  /* ----- Relationship Attributes ----- */
  owner: belongsTo('user'),

  members: hasMany('user', {
    inverse: null,
  }),

  notebooks: hasMany('notebook'),

});
