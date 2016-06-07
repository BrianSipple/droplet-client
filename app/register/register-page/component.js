import Ember from 'ember';
import PageContentComponent from 'droplet/components/page/page-content/component';

const {
  K,
} = Ember;

export default PageContentComponent.extend({

  classNames: ['c-register-page'],

  newUserModel: null,
  newUserPrivateInfoModel: null,
  onRegisterUser: null,
  isFormDirty: false,
  isProcessingRegistration: false,

  init () {
    this._super(...arguments);

    this.onRegisterUser = (typeof this.onRegisterUser === 'function') ? this.onRegisterUser : K;
  },


  actions: {
    registerUser (formValues) {
      this.set('isProcessingRegistration', true);
      this
        .get('onRegisterUser')()
        .then(() => this.set('isProcessingRegistration', false));
    }
  },

});
