import Ember from 'ember';

const {
  Component,
} = Ember;

export default Component.extend({

  tagName: 'svg',

  attributeBindings: [
    'id',
    'version',
    'viewBox',
    'xmlns',
    'xmlnsXlink:xmlns:xlink',   // special syntax for namespaced attributes (https://github.com/emberjs/ember.js/pull/10186#discussion_r22911832)
    'x',
    'y',
    'width',
    'height',
    'stroke',
    'strokeWidth:stroke-width',
    'fill',
    'preserveAspectRatio',
    'role',
    'style',
  ],

  iconURL: null,

  // Default attributes
  version: '1.1',
  width: '100%',
  height: '100%',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  role: 'img',
  strokeWidth: '0.125em',
});
