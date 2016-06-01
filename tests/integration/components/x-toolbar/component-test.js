import { moduleForComponent /* , test */ } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-toolbar', 'Integration | Component | x navbar', {
  integration: true
});

skip('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{x-toolbar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#x-toolbar}}
      template block text
    {{/x-toolbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
