import OAuth2PasswordGrantAuthenticator from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'droplet/config/environment';

const { APP: { apis: { droplet: dropletAPI } } } = ENV;


export default OAuth2PasswordGrantAuthenticator.extend({

  serverTokenEndpoint: `${dropletAPI.HOST}/${dropletAPI.NAMESPACE}/authenticate`,

  // restore(/* data */) {
  // },
  //
  // authenticate(/* args */) {
  // },
  //
  // invalidate(/* data */) {
  // }
});
