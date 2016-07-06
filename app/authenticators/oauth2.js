import Ember from 'ember';
import ENV from 'droplet/config/environment';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import AuthConstants from 'droplet/utils/constants/auth';

const {
  inject: { service },
  RSVP,
  RSVP: { Promise },
  Logger: { log },
  run,
  $: { ajax },
  isEmpty,
  computed,
  Object: EmberObject
} = Ember;


export default BaseAuthenticator.extend({

  UserService: service('user'),

  /**
  * configurable property that stores custom headers that will be sent on every request.
  */
  headers: null,

  /**
    The client_id to be sent to the authentication server (see
    https://tools.ietf.org/html/rfc6749#appendix-A.1). __This should only be
    used for statistics or logging etc. as it cannot actually be trusted since
    it could have been manipulated on the client!__
    @property clientId
    @type String
    @default null
    @public
  */
  _clientIdHeader: computed('clientId', function _clientIdHeader () {
    const clientId = this.get('clientId');

    if (!isEmpty(clientId)) {
      const base64ClientId = window.btoa(clientId.concat(':'));
      return { Authorization: `Basic ${base64ClientId}` };
    }
  }),

  _usernameHeader: computed('currentUser', function _usernameHeader() {
    const { username } = this.get('currentUser');

    if (!isEmpty(username)) {
      return { Username: username };
    }
  }),

  init () {
    this._super(...arguments);

    const {
      IDENTIFICATION_FIELD,
      PASSWORD_FIELD,
      TOKEN_PROPERTY_NAME,
    } = AuthConstants.authenticators.oauth2;

    const { APP: { apis: { droplet: dropletAPI } } } = ENV;

    this.headers = this.headers || {};
    this.identificationField = IDENTIFICATION_FIELD;
    this.passwordField = PASSWORD_FIELD;
    this.tokenPropertyName = TOKEN_PROPERTY_NAME;
    this.serverTokenEndpoint = `${dropletAPI.HOST}/${dropletAPI.NAMESPACE}/authenticate`;
    // this.serverTokenRevocationEndpoint: `${dropletAPI.HOST}/${dropletAPI.NAMESPACE}/authenticate/revoke`
  },

  /**
  * Returns an object used to be sent for authentication.
  */
  getAuthenticateData (credentials) {
    return {
      [this.identificationField]: credentials.identification,
      [this.passwordField]: credentials.password,
    };
  },


  /**
  Returns an object with properties the `authenticate` promise will resolve,
  be saved in and accessible via the session.
  @method getResponseData
  @return {object} An object with properties for the session.
  */
  getResponseData (response) {
    return response;
  },


  getResponsePromise(requestData, headerOptions) {
    // return new Promise((resolve, reject) => {
    //   this
    //     .makeRequest(requestData, headerOptions)
    //     .then(
    //       // success
    //       (response) => {
    //         debugger;
    //         run(() => { resolve(response); });
    //       },
    //       // failure
    //       (response) => {
    //         run(() => {
    //           reject(response.responseJSON || response.responseText);
    //         });
    //       }
    //     );
    // });
    return this.makeRequest(requestData, headerOptions)
      .then(
        response => { return response.json(); },
        errResponse => { throw new Error(errResponse); }
      );
  },


  /**
  * Authenticates the session with the specified credentials and
  * optional scope by issueing a POST request to
  * the serverTokenEndpoint and receiving the access token in response (in a
  * JSON object) as a Proimise.
  *
  * If the credentials are valid (and the optionally requested
  * scope is granted) -- meaning authentication has succeeded --
  * a promise that resolves with the server's response is returned.
  *
  * Otherwise a promise that rejects with the error as returned
  * by the server is returned.
  *
  * NOTE: The data object of the returned resolved promise becomes stored
  * on `SessionService.data`
  *
  * @param: credentials -> { identification: identificationValue, password: passwordValue] }
  */
  async authenticate (credentials, scope) {

    log(`authenticator::oauth2 -- Authenticating with credentials: ${JSON.stringify(credentials)}
    Optional scope: ${scope}`);

    const requestData = this.getAuthenticateData(credentials);

    try {
      const response = await this.getResponsePromise(requestData, scope);

      if (response.success) {
        return this.getResponseData(response);
      }
      throw new Error(this.getResponseData(response));

    } catch (err) {
      throw new Error(err.stack);
    }

  },

  /**
  Restores the session from a set of session properties.

  This will return a resolving promise when there's a non-empty
  `token` in the `properties` param and a rejecting promise otherwise.

  @method restore
  @param {Object} properties The properties to restore the session from
  @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being authenticated

  NOTE: Even though the restore() method does not need to "await" anything,
  the ember-simple-auth API expects a rejected promise. So, throwing
  in an "async" function rejects the returned promise of restore().
  */
  restore (properties) {
    const propsObject = EmberObject.create(properties);

    return new Promise((resolve, reject) => {
      if (!isEmpty(propsObject[this.tokenPropertyName])) {
        // attempt to restore the currentUser record
        // and return the resolving a promise
        return this
          .get('UserService').getUserForAuthenticatedSession(propsObject.userId)
          .then(user => {
            this.set('currentUser.content', user);
            resolve(propsObject);
          })
          .catch(err => { reject(err.stack); });
      }

      // else
      return reject('No token to restore found');
    });
  },


  /**
  * TODO(possibly): API call to logout `return Ember.$.ajax('/api/v1/logout')`
  */
  invalidate () {
    debugger;
    log('Invalidating session...');

    return RSVP.resolve();
  },


  /**
  @method makeRequest
  @param {Object} data Object that will be sent to server
  @param {Object} headers Additional headers that will be sent to server
  @private
  */
  makeRequest (requestData, headerOptions = {}) {
    // const options = {
    //   url: this.serverTokenEndpoint,
    //   method: 'POST',
    //   data: JSON.stringify(requestData),
    //   dataType: 'json',
    //   contentType: 'application/json',
    //   headers: this._makeHeadersBeforeRequest(headers),
    //   beforeSend: (xhr, settings) => {
    //     xhr.setRequestHeader('Accept', settings.accepts.json);
    //     if (headers) {
    //       for (const headerKey of Object.keys(headers)) {
    //         xhr.setRequestHeader(headerKey, headers[headerKey]);
    //       }
    //     }
    //   },
    // };
    debugger;

    const requestOptions = {
      url: this.serverTokenEndpoint,
      method: 'POST',
      // body: JSON.stringify(requestData),
      body: requestData,
      mode: 'cors',
      headers: this._makeHeadersBeforeRequest(headerOptions)
    };

    // return ajax(options);
    return fetch(this.serverTokenEndpoint, new Request(requestOptions));

  },

  _makeHeadersBeforeRequest(customHeaderOpts = {}) {
    const clientIdHeader = this.get('_clientIdHeader');
    const usernameHeader = this.get('usernameHeader');

    const headerOpts = { 'Content-Type': 'application/json' };

    if (!isEmpty(clientIdHeader)) {
      Object.assign(headerOpts, clientIdHeader);
    }

    if (!isEmpty(usernameHeader)) {
      Object.assign(headerOpts, usernameHeader);
    }

    Object.assign(headerOpts, customHeaderOpts);

    return new Headers(headerOpts);
  }
});
