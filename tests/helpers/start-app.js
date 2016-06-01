import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import bindTestingDataAttributes from './bind-testing-data-attributes';
import 'droplet/tests/helpers/asserts/index';
import 'droplet/tests/helpers/async-helpers/index';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    bindTestingDataAttributes();
  });

  return application;
}
