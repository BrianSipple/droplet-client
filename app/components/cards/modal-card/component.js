import Ember from 'ember';
import SavvyBoxShadowClassMixin from 'droplet/mixins/component/savvy-box-shadow';

const { Component } = Ember;


export default Component.extend(SavvyBoxShadowClassMixin, {

  classNames: ['c-modal-card'],

});
