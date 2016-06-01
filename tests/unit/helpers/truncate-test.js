import { truncate } from '../../../helpers/truncate';
import { module, test } from 'qunit';

let maxLength = 20;
let text;
let actual, expected;

module('Unit | Helper | truncate');


test('Leaving text shorter than the specified length untouched', function (assert) {

  text = 'Star Wars';

  expected = text;
  actual = truncate([text], { length: maxLength });

  assert.equal(actual, expected);
});

// Replace this with your real tests.
test(` \
  Truncating text longer than a specified length, \
  adding ellipses ("...") after the point of truncation`,
  function (assert) {

    text = `A 17th Century tale of adventure on the Caribbean Sea`;

    expected = `A 17th Century tale ...`;
    actual = truncate([text], { length: maxLength });

    assert.equal(actual, expected);
  }
);

test(`robustness against empty inputs`, function (assert) {

  text = '';

  expected = text;
  actual = truncate([text], { length: maxLength });

  assert.equal(actual, expected);
});

test(`robustness against unspecified or less-than-1 lengths`, function (assert) {

  maxLength = null;
  text = 'Star Wars';

  expected = text;
  actual = truncate([text], { length: maxLength });

  assert.equal(actual, expected);
});
