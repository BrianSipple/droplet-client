import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('flash-message', 'Integration | Component | flash message', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{flash-message}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);

  // Template block usage:
  this.render(hbs`
    {{#flash-message}}
      template block text
    {{/flash-message}}
  `);

  expected = 'template block text';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});
