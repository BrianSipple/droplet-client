import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('modals/centered-modal', 'Integration | Component | modals/centered modal', {
  integration: true,
  beforeEach () {
    this.set('destinationElementId', 'ember-testing');
  },
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.render(hbs`{{widgets/modals/centered-modal destinationElementId=destinationElementId}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});
