/**
 * TODO: Deprecate usage of this and just use the classes directly with
 * proper composition techniques.
 */

import Ember from 'ember';
import styleConstants from 'droplet/utils/constants/styles';

const { Mixin, computed } = Ember;
const { min, max } = Math;

export default Mixin.create({

  classNameBindings: ['boxShadowClassName'],

  boxShadowDepth: null,

  boxShadowClassName: computed('boxShadowDepth', function computeBoxShadowClassName() {
    return this._computeBoxShadowClass();
  }),

  _computeBoxShadowClass() {
    const {
      DEFAULT_BOX_SHADOW_DEPTH,
      MAX_BOX_SHADOW_DEPTH,
      classNames: { BOX_SHADOW_DEPTH_PREFIX },
    } = styleConstants;

    let boxShadowDepth = this.get('boxShadowDepth');

    if (!boxShadowDepth || Number.isNaN(Number(boxShadowDepth))) {
      boxShadowDepth = DEFAULT_BOX_SHADOW_DEPTH;
    }
    boxShadowDepth = max(0, min(boxShadowDepth, MAX_BOX_SHADOW_DEPTH));

    return `${BOX_SHADOW_DEPTH_PREFIX}-${boxShadowDepth}`;
  },
});
