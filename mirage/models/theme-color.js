import Ember from 'ember';
import { Model } from 'ember-cli-mirage';

const { computed } = Ember;


export default Model.extend({

  HSLAString: computed('hue', 'saturation', 'lightness', 'alpha', function HSLAString () {
    debugger;
    const { hue, saturation, lightness, alpha } = getProperties(this,
      'hue',
      'saturation',
      'lightness',
      'alpha'
    );

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }),
});
