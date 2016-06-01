import Ember from 'ember';

const { Mixin } = Ember;


export default Mixin.create({
  attributeBindings: ['tabindex'],

  tabindex: -1,
});
