import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('scroll-list', 'Integration | Component | scroll-list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{scroll-list}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);

  // Template block usage:
  this.render(hbs`
    {{#scroll-list}}
      template block text
    {{/scroll-list}}
  `);

  expected = 'template block text';
  actual = getNode(this).textContent.trim();
  assert.equal(getNode(this).textContent.trim(), 'template block text');
});
