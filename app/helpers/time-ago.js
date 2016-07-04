import Ember from 'ember';
import moment from 'moment';

/**
 * Helper that attempt to create a moment.js date from a utc string
 * and then compute how off in the past it is
 */
export function timeAgo(datetime /* , hash */) {
  let result = datetime[0].toString();

  if (!moment.isMoment(result)) {
    result = moment.utc(result);
  }

  return result.fromNow();
}

export default Ember.Helper.helper(timeAgo);
