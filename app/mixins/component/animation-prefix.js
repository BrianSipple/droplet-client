import Ember from 'ember';
import getAnimationPrefix from 'ember-stagger-swagger/utils/get-animation-prefix';

const { Mixin } = Ember;


export default Mixin.create({

  didInsertElement () {
    this._super(...arguments);

    this._cacheAnimationPrefix();
  },

  _cacheAnimationPrefix () {
    this.set('animationPrefix', getAnimationPrefix(this.element));
  },

});
