import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';


export default Model.extend({

  /* -----  "Own" Data Attributes  ----- */
  name: attr('string'),
  description: attr('string'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),

});
