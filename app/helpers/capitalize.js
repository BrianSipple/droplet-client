import Ember from 'ember';

export function capitalize(input) {
  return input
    .toString()
    .split(/\s+/)
    .map(word => word.toLowerCase().capitalize())
    .join(' ');
}

export default Ember.Helper.helper(capitalize);
