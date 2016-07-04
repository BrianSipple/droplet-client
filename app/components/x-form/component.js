import Ember from 'ember';
import FormMixin from 'droplet/mixins/component/form';

const { Component } = Ember;


export default Component.extend(FormMixin, {
  classNames: ['c-form']
});
