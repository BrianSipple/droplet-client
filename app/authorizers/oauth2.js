/**
* Adds authorization information to outgoing API requests
*/
import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';
import AuthConstants from 'droplet/utils/constants/auth';

const {
  inject: { service },
  isEmpty,
  K: noOp,
  get,
} = Ember;


export default BaseAuthorizer.extend({

  SessionService: service('session'),

  /**
  *  The prefix used in the value of the Authorization header.
  */
  authorizationPrefix: null,


  /**
  * The name of the property in session that contains token used for authorization.
  */
  tokenPropertyName: null,

  /**
  * The name of the HTTP Header used to send token.
  */
  authorizationHeaderName: null,


  init () {
    this._super(...arguments);

    const {
      TOKEN_PROPERTY_NAME,
      ONE_TIME_TOKEN_PROPERTY_NAME,
      AUTHORIZATION_HEADER_NAME,
      AUTHORIZATION_PREFIX,
    } = AuthConstants.authorizers.oauth2;

    this.tokenPropertyName = this.tokenPropertyName || TOKEN_PROPERTY_NAME;
    this.oneTimeTokenPropertyName = this.oneTimeTokenPropertyName || ONE_TIME_TOKEN_PROPERTY_NAME;
    this.authorizationHeaderName = this.authorizationHeaderName || AUTHORIZATION_HEADER_NAME;
    this.authorizationPrefix = this.authorizationPrefix || AUTHORIZATION_PREFIX;
  },


  /**
  * Authorizes an XHR request by sending the `token`
  * properties from the session in the `Authorization` header:
  */
  authorize (data = {}, block = noOp) {
    const token = data[get(this, 'tokenPropertyName')];
    const oneTimeToken = data[get(this, 'oneTimeTokenPropertyName')];
    const authorizationPrefix = get(this, 'authorizationPrefix') || '';

    const isAuthorized = ( this.get('SessionService.isAuthenticated') && !isEmpty(token) ) || oneTimeToken;

    if (isAuthorized) {
      const tokenToUse = oneTimeToken || token;
      block(this.authorizationHeaderName, `${authorizationPrefix}${tokenToUse}`);
    }
  },

});
