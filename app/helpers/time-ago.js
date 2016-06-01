import Ember from 'ember';
import moment from 'moment';

export function timeAgo(datetime /* , hash */) {
  let result = datetime[0].toString();

  if (!moment.isMoment(result)) {
    result = moment(result);
  }

  return result.fromNow();
}

export default Ember.Helper.helper(timeAgo);
