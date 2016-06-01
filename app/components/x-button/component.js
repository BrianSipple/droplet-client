import Ember from 'ember';
import TabbableMixin from 'droplet/mixins/component/tabbable';
import AriaAttributesMixin from 'droplet/mixins/component/aria-attributes';

const {
  Component,
  computed,
} = Ember;


// TODO: Make this a "core button" mixin
export default Component.extend(TabbableMixin, AriaAttributesMixin, {

  tagName: 'button',
  ariaRole: 'button',

  classNames: ['c-button'],
  classNameBindings: ['highlightOnHoverClass', 'buttonTypeClassName'],

  // API
  highlightOnHover: null,
  title: null,


  // TODO: Make a hoverButton component?
  highlightOnHoverClass: computed('highlightOnHover', function highlightOnHoverClass() {
    return this.get('highlightOnHover') ? 'c-button--hover-highlight' : '';
  }),



});
