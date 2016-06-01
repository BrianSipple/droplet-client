import Ember from 'ember';

const { Mixin } = Ember;


export default Mixin.create({

  attributeBindings: ['aria-label', 'aria-labelledby', 'aria-describedby'],
});
