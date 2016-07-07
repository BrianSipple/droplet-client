import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  tagName: 'section',
  classNames: ['c-note-page-chat-panel', 'g-box-shadow-3', 'u-relative', 'u-fill-height'],

  chatViews: null,
  activeChatViewIndex: -1
});
