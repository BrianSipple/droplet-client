import Ember from 'ember';
import makeDate from 'droplet/utils/make-date';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import noteSortingConstants from 'droplet/utils/constants/note-sorting';
import NotebookValidations from 'droplet/validations/notebook';


const { computed } = Ember;
const { alias } = computed;

const {
  queryParamCodes: { RECENTLY_UPDATED: RECENTLY_UPDATED_PARAM_CODE },
  properties: noteSortProperties,
  options: noteSortOptions
} = noteSortingConstants;


export default Model.extend(NotebookValidations, {

  /* -----  "Own" Data Attributes  ----- */
  title: attr('string'),
  createdAt: attr('utc', { defaultValue: makeDate }),
  lastUpdatedAt: attr('utc', { defaultValue: makeDate }),

  noteSortOptions: attr('array', { defaultValue: () => noteSortOptions }),
  currentNoteSortParam: attr('string', { defaultValue: RECENTLY_UPDATED_PARAM_CODE }),


  /* ----- Relationship Attributes ----- */
  owner: belongsTo('user', {
    inverse: 'notebooks',
  }),

  collaborators: hasMany('user', {
    inverse: null,
    defaultValue: () => [],
  }),

  // pond: belongsTo('pond'),  // TODO: Ponds concept
  notes: hasMany('note', { defaultValue: () => [] }),

  /* ----- Computed Attributes ----- */
  noteCount: alias('notes.length'),
  collaboratorCount: alias('collaborators.length'),

  currentNoteSortOption: computed('currentNoteSortParam', function currentNoteSortOption () {
    const currentSortParam = this.get('currentNoteSortParam');

    return this.get('noteSortOptions').find(option => option.code === currentSortParam);
  }),

  currentNoteSortProperties: computed('currentNoteSortOption', function currentNoteSortProperties () {
    // get the current sort option from the current query param
    const currentNoteSortOption = this.get('currentNoteSortOption');

    return currentNoteSortOption.properties.split(',');
  })

});
