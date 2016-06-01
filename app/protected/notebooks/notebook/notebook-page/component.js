import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service },
  get
} = Ember;

const { readOnly } = computed;


export default Component.extend({

  NotebookPageService: service('notebook-page'),
  classNames: ['c-notebooks-notebook-page', 'u-fill-width', 'u-fill-height'],

  notebook: null,
  navLinks: readOnly('NotebookPageService.navLinks'),
  activeRouteName: null,

  activeLinkIndex: computed('navLinks.[]', 'activeRouteName', function activeLinkIndex() {
    const activeRouteName = this.get('activeRouteName');
    const navLinks = this.get('navLinks');

    return navLinks.findIndex(linkItem => activeRouteName.search(get(linkItem, 'routeName')) > -1);
  }),
});
