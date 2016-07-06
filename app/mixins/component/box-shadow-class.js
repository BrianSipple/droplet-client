import Ember from 'ember';

const { Mixin, computed } = Ember;


export default Mixin.create({
  classNameBindings: ['boxShadowClassName'],

  shadowDepth: null,


  boxShadowClassName: computed('shadowDepth', {
    get() {
      const shadowDepth = this.get('shadowDepth') > 0 ? this.get('shadowDepth') : 1;
      return `g-box-shadow-${shadowDepth}`;
    }
  })
});
