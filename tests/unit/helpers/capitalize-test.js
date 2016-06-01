import { capitalize } from 'droplet/helpers/capitalize';
import { module, test } from 'qunit';

let expected, actual, msg;


module('Unit | Helper | capitalize');

test('capitlization of input', function(assert) {

  expected = 'Seattle';
  actual = capitalize('seattle');
  msg = 'The first letter of a space-separated word in a string is capitalized';

  assert.equal(actual, expected, msg);


  expected = 'Seattle Seahawks';
  actual = capitalize('seattle seahawks');
  msg = 'The first letter of every space-separated word in a string is capitalized';

  assert.equal(actual, expected, msg);

});
