import Ember from 'ember';
import Transform from 'ember-data/transform';

const { A, isArray } = Ember;

export default Transform.extend({
  deserialize(serialized) {
    return isArray(serialized) ? serialized.toArray() : null;
  },

  serialize(deserialized) {
    return A(deserialized);
  },
});
