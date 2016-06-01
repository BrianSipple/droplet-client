import DS from 'ember-data';
import moment from 'moment';

const { Transform } = DS;

/**
 * NOTE: Moment.js date parsing can be a slow operation.
 * If we're loading many records, we may want to consider
 * serializing dates as seconds since epoch,
 * and doing the parsing at the UI layer.
 */
export default Transform.extend({
  deserialize(serialized) {
    return (serialized && serialized instanceof Date) ? serialized.toJSON() : serialized;
  },

  serialize(deserialized) {
    return moment.utc(deserialized);
  },
});
