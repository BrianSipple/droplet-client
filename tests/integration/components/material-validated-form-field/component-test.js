import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('material-validated-form-field', 'Integration | Component | material validated form field', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{material-validated-form-field}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);

  // Template block usage:
  this.render(hbs`
    {{#material-validated-form-field}}
      template block text
    {{/material-validated-form-field}}
  `);

  expected = 'template block text';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});
