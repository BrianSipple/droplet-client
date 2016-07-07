import Ember from 'ember';

const { Service } = Ember;

const chatViews = [
  { title: 'Text', iconURL: '/assets/icons.svg#icon_test.svg' },
  { title: 'Video', iconURL: '/assets/icons.svg#icon_test.svg' },
  { title: 'Settings', iconURL: '/assets/icons.svg#icon_test.svg' }
];


export default Service.extend({
  chatViews,
  activeChatViewIndex: 0
});
