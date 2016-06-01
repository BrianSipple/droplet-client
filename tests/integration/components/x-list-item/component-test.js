import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('x-list-item', 'Integration | Component | x list item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-list-item}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);

  // Template block usage:
  this.render(hbs`
    {{#x-list-item}}
      template block text
    {{/x-list-item}}
  `);

  expected = 'template block text';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});
