import Ember from 'ember';

const { Component, computed } = Ember;


export default Component.extend({

  tagName: 'li',
  classNames: ['o-list-item', 'u-mr2', 'u-ml2', 'u-relative'],
  classNameBindings: ['listItemHeightClassName'],

  size: 'medium',

  headerSizeClass: computed('size', function headerSizeClass () {
    const size = this.get('size');

    return {
      medium: null, // stick with `o-list-item`
      tall: 'o-list-item--tall'
    }[size];
  })

});
