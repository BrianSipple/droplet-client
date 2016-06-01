import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import ThemeColorValidations from 'droplet/validations/theme-color';

const { computed, getProperties } = Ember;


export default Model.extend(ThemeColorValidations, {

  /* -----  "Own" Data Attributes  ----- */
  hue: attr('number'),
  saturation: attr('number'),
  lightness: attr('number'),
  alpha: attr('number'),


  /* ----- Computed Attributes ----- */
  HSLAString: computed('hue', 'saturation', 'lightness', 'alpha', function HSLAString () {
    const { hue, saturation, lightness, alpha } = getProperties(this,
      'hue',
      'saturation',
      'lightness',
      'alpha'
    );

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }),
});
