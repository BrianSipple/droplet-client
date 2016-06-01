import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

const HSLAStrings = [
  'hsla(10, 40%, 22%, 1.0)',
  'hsla(20, 99%, 66%, 1.0)',
  'hsla(30, 34%, 22%, 1.0)',
  'hsla(40, 99%, 94%, 1.0)',
  'hsla(50, 21%, 50%, 1.0)',
  'hsla(14, 99%, 56%, 1.0)',
  'hsla(70, 59%, 48%, 1.0)',
  'hsla(80, 29%, 87%, 1.0)',
  'hsla(90, 84%, 21%, 1.0)',
  'hsla(290, 48%, 11%, 1.0)',
];


let actual, expected;

moduleForComponent('color-palette-menu-widget/color-item', 'Integration | Component | color palette menu widget/color item', {
  integration: true
});

test('rendering with the background color of its passed-in color', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{color-palette-menu-widget/color-item}}`);

  expected = '';
  actual = getNode(this).textContent.trim();
  assert.equal(actual, expected);
});

//
// test(`rendering its element with a "selected" indicator if its
// passed in color matches a passed-in \`activeColor\``, function(assert) {
//
//   this.set('colorHSLA', HSLAStrings[2]);
//   this.set('activeHSLA', HSLAStrings[3]);
//   this.render(hbs`{{color-palette-menu-widget colorHSLAs=colorHSLA activeColorHSLA=activeHSLA}}`);
//
//   // const indicatorElem = getNode(this);
//   //
//   // expected = 'none';
//   // actual =
//   // assert.equal(actual, expected);
// });
