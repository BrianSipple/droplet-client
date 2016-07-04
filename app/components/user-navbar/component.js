import Ember from 'ember';
import xNavbar from 'droplet/components/x-toolbar/component';

const { computed } = Ember;


export default xNavbar.extend({

  classNameBindings: [
    'useBorder:g-border-bottom-s2',
    'useBoxShadow:g-box-shadow-2',
    'isFixed:u-fixed',
    'headerSizeClass',
    'flexClassNames'
  ],

  classNames: [
    'c-x-toolbar',
    'u-relative',
    'u-fill-width',
    'u-edge-top',
    'u-edge-left'
  ],

  useBorder: false,
  flex: true,
  direction: 'horizontal',
  useBoxShadow: true,
  isFixed: true,
  size: 'medium',

  headerSizeClass: computed('size', function headerSizeClass () {
    const size = this.get('size');

    return {
      xSmall: 'o-header-xs',
      small: 'o-header-sm',
      medium: 'o-header-md',
      large: 'o-header-lg'
    }[size];
  }),

  flexClassNames: computed('flex', 'direction', {
    get() {
      const isFlex = this.get('flex');

      return isFlex ? `o-flex-grid o-flex-grid--center o-flex-grid--noWrap` : null;
    }
  })

});
