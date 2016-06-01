import Ember from 'ember';

const {
  Helper: { helper },
} = Ember;


/**
 * Helper that takes in a date string and converts it to a valid
 * `datetime` attribute for the HTML5 time attribute
 * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
 *
 * TODO: Craft the specifics of how this will work 😃
 */
export function htmlDatetime(params /* , hash */) {
  return params;
}

export default helper(htmlDatetime);
