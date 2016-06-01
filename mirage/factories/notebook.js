import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';
import noteSortingConstants from 'droplet/utils/constants/note-sorting';

const { queryParamCodes: noteSortQueryParamCodes, options: noteSortOptions, properties: noteSortProperties } = noteSortingConstants;

const notebookTitles = [
  'VR Designs',
  'Ember Projects',
  'AR Designs',
  'Artwork',
  'Animation',
  'Photos',
  'Math',
  'Reminders',
  'Git',
];

const { random, floor } = Math;


export default Factory.extend({

  title(i) {
    return `${faker.random.arrayElement(notebookTitles)} ${i + 1}`;
  },

  createdAt (i) {
    return moment().subtract((i + 1) * i, 'days');
  },

  lastUpdatedAt (i) {
    return moment().subtract(i, 'days');
  },

  noteSortOptions,
  currentNoteSortParam: noteSortQueryParamCodes.RECENTLY_UPDATED,

  currentNoteSortProperties () {
    return noteSortProperties.RECENTLY_UPDATED.split(',');
  },


});
