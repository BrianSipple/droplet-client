import { moduleForComponent, test } from 'ember-qunit';<% if (testType === 'integration') { %>
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';<% } %>

let actual, expected;


moduleForComponent('<%= componentPathName %>', '<%= friendlyTestDescription %>', {
  <% if (testType === 'integration' ) { %>integration: true<% } else if(testType === 'unit') { %>// Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true<% } %>
});

test('it renders', function(assert) {
  <% if (testType === 'integration' ) { %>// Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{<%= componentPathName %>}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);

  // Template block usage:
  this.render(hbs`
    {{#<%= componentPathName %>}}
      template block text
    {{/<%= componentPathName %>}}
  `);

  expected = 'template block text';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);<% } else if(testType === 'unit') { %>
  // Creates the component instance
  /*let component =*/ this.subject();
  // Renders the component to the page
  this.render();

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(this.$().text().trim(), '');<% } %>
});
