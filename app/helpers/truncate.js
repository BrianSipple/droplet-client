/**
* Truncate text longer than a specified length,
* adding ellipses ("...") at the point of truncation
*
* Usage: {{truncate description length=80}}
*/

import Ember from 'ember';

const { Helper: { helper } } = Ember;


export function truncate(params, hash) {
  const { length } = hash;
  const text = params[0];

  if (text) {
    if (length > 0 && text.length > length) {
      return `${text.substring(0, length)}...`;
    }
  }
  
  return text;
}

export default helper(truncate);
