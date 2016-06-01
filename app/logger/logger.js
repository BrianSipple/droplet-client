import Ember from 'ember';

const { Object: EmberObject } = Ember;

export default EmberObject.extend({

  log (message) {
    console.log(`💡 ${message}`);
  },

  warn (message) {
    console.log(`⚠️ ${message}`);
  },

  yay (message) {
    console.log(`🎉🎉🎉 ${message}`);
  },

  funcStart (funcName) {
    console.log(`📡 entered ${funcName}`);
  },


});
