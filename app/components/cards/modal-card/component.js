import Ember from 'ember';
import SavvyBoxShadowClassMixin from 'droplet/mixins/component/box-shadow-class';

const { Component } = Ember;


export default Component.extend(SavvyBoxShadowClassMixin, {

  classNames: ['c-modal-card'],

});
