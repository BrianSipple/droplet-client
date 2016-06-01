import ErrorReporter from 'droplet/services/error-reporter';

export function initialize (application) {
  application.register('service:error-reporter', ErrorReporter, { instantiate: true, singleton: true });
  // application.inject('route', 'error-reporter', 'service:error-reporter');
}

export default {
  name: 'register-error-reporter',
  initialize,
};
