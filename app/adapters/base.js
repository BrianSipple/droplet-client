import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'droplet/config/environment';

const {
  Enumerable: { forEach },
  $,
  String: { camelize },
} = Ember;

const {
  JSONAPIAdapter,
  InvalidError,
} = DS;

const { APP: { apis: { droplet: dropletAPI } } } = ENV;


export default JSONAPIAdapter.extend({

  host: dropletAPI.URL_PREFIX,
  namespace: dropletAPI.BASE_URL,

  /**
   * Allow ember data to send requests for multiple items at once
   * Use the default URL method ids[]= etc. as our backend should automatically decode this.
   *
   * TODO: Explore this further
   */
  // coalesceFindRequests: true,

  /**
   * The general rule of thumb seems to be to set this to false
   * for a given set of records when its rarely updated on
   * the backend by other processes (or users). (Also, having less requests
   * will make tests easier to write.)
   *
   * TODO: Explore more fine-grained usage of this property when that doesn't
   * hold true
   */
  shouldBackgroundReloadRecord() {
    return false;
  },


  // Implement custom error handling on model objects
  ajaxError (err) {
    debugger;
    const error = this._super(err);

    if (err && err.status === 422) {

      const response = $.parseJSON(err.responseText);
      const errors = {};

      if (response.errors) {

        const { errors: jsonErrors } = response;

        forEach(Object.keys(jsonErrors), key => {
          errors[camelize(key)] = jsonErrors[key];
        });
      }

      return new InvalidError(errors);

    } else {
      return error;
    }
  },

  handleResponse (status, headers, payload) {
    if (status === 422 && payload.errors) {
      return new InvalidError(payload.errors);
    }

    return this._super(...arguments);
  },

});
