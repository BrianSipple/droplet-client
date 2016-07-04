import Ember from 'ember';
import XToolbar from 'droplet/components/x-toolbar/component';

const { computed: { readOnly, bool }, inject: { service } } = Ember;


export default XToolbar.extend({
  NavbarService: service('navbar'),
  tagName: 'nav',
  classNames: ['c-navbar', 'u-fixed'],
  classNameBindings: ['isVisible'],

  size: 'small',
  title: null,

  activeNavLinks: readOnly('NavbarService.activeNavLinks'),
  isVisible: bool('NavbarService.isNavbarVisible')
});
