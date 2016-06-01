import Ember from 'ember';

export default function destroyApp(application) {
  Ember.run(application, 'destroy');

  /* eslint-disable no-undef */

  server.shutdown();

  /* eslint-enable no-undef */
}
