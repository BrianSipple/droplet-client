import { timeAgo } from 'droplet/helpers/time-ago';
import { module } from 'qunit';
import test from 'droplet/tests/ember-sinon-qunit/test';


module('Unit | Helper | time ago', {
  beforeEach() {
    this.secondsAgo = 444;
    test.context = { secondsAgo: 444 };
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  const result = timeAgo([42]);
  debugger;
  assert.ok(result);
});
