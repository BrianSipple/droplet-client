import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('modals/full-screen-modal', 'Integration | Component | modals/full-screen modal', {
  integration: true,
  beforeEach () {
    this.set('destinationElementId', 'ember-testing');
  },
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{widgets/modals/full-screen-modal
    destinationElementId=destinationElementId
    targetAttachment="top"
  }}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});
