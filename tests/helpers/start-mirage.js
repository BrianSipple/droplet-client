// http://www.ember-cli-mirage.com/docs/v0.2.0-beta.8/manually-starting-mirage/
import mirageInitializer from '../../initializers/ember-cli-mirage';

export default function startMirage(container) {
  mirageInitializer.initialize(container);
}
