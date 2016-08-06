import Ember from 'ember';
import Transform from 'ember-data/transform';

const { A, isArray } = Ember;

export default Transform.extend({
  /**
   * Convert to the format expected by the client
   */
  deserialize(serialized) {
    return isArray(serialized) ? serialized.toArray() : null;
  },

  /**
   * Convert to the format expected by the backend
   */
  serialize(deserialized) {
    return A(deserialized);
  }
});
