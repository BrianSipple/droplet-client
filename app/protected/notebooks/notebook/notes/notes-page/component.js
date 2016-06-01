import Ember from 'ember';
import PageContentComponent from 'droplet/components/page/page-content/component';

const {
  computed: { alias },
  inject: { service },
} = Ember;

export default PageContentComponent.extend({

  NotebookPageService: service('notebook-page'),  // TODO: Drive a lot of the data with this
  classNames: ['c-notes-page'],


  isFilteringNotesForSearch: false,


  noteSearchResults: alias('NotebookPageService.noteSearchResults'),
});
