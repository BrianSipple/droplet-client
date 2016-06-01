import ENV from 'droplet/config/environment';
import AuthConfiguration from 'ember-simple-auth/configuration';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

export function initialize(application) {

  const config = ENV['ember-simple-auth'] || {};
  config.baseURL = ENV.baseURL;
  AuthConfiguration.load(config);

  // registers a "session:main" object and injects 'session-store:application' into it as the "store"
  setupSession(application);

  // injects "session:main" into the "session" of "service:session"
  setupSessionService(application);
}

export default {
  name: 'ember-simple-auth',
  initialize,
};
