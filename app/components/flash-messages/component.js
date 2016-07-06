import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;


export default Component.extend({
  flashMessages: service(),
  classNames: ['c-flash-messages', 'u-b-box'],


  /**
   * ember-cli-flash expects flash messages to be ordered
   * from top to bottom. Since toasts come up from the bottom,
   * we need to reverse the order so that the newest message
   * is on the bottom
   */
  reversedFlashMessages: computed('flashMessages.arrangedQueue.[]', {
    get() {
      return this.get('flashMessages.arrangedQueue').reverse();
    }
  })

});
