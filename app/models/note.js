import Ember from 'ember';
import Model from 'ember-data/model';
import makeDate from 'droplet/utils/make-date';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import NoteValidations from 'droplet/validations/note';

const { computed: { alias, map } } = Ember;


export default Model.extend(NoteValidations, {

  /* -----  "Own" Data Attributes  ----- */
  title: attr('string'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),
  content: attr('string'),
  revisionCount: attr('number', { defaultValue: 0 }),
  priority: attr('number', { defaultValue: 1 }),

  /* ----- Relationship Attributes ----- */
  collaborators: hasMany('user', {
    inverse: null,
    defaultValue: () => [],
  }),

  notebook: belongsTo('notebook'),
  tags: hasMany('tag', { defaultValue: () => [] }),

  activeThemeColor: belongsTo('theme-color', {
    inverse: null,
  }),

  /* ----- Computed Attributes ----- */
  owner: alias('notebook.owner'),
  collaboratorCount: alias('collaborators.length'),

});
