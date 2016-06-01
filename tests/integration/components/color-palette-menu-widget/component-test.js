import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';
import bindTestingDataAttributes from 'droplet/tests/helpers/bind-testing-data-attributes';

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

const SELECTORS = {
  menuItem: '[data-test-selector="color-palette-menu-widget__color-item"]',
  menuItemActiveIcon: '[data-test-selector="color-palette-menu-widget-menu-item__active-icon"]',
};

let actual, expected;


moduleForComponent('color-palette-menu-widget', 'Integration | Component | color palette menu widget', {
  integration: true,
  beforeEach() {
    bindTestingDataAttributes();
  },
});

// TODO: Make color configuration more robust than just passing HSLAs?
test('rendering a set of selection items from the list of colors that it\'s passed', function(assert) {
  this.set('colorHSLAs', HSLAStrings);
  this.render(hbs`{{color-palette-menu-widget colorHSLAs=colorHSLAs}}`);

  expected = HSLAStrings.length;
  actual = getNode(this).querySelectorAll(SELECTORS.menuItem).length;
  assert.equal(actual, expected);

  const newLength = HSLAStrings.length - 3;
  this.set('colorHSLAs', HSLAStrings.slice(0, newLength));

  expected = newLength;
  actual = getNode(this).querySelectorAll(SELECTORS.menuItem).length;
  assert.equal(actual, expected);

});

test(`\`onColorSelected\` gets called with the matching selected color on click`, function (assert) {

  this.set('selectColor', (indexSelected, selectedColor) => {
    actual = selectedColor;
    expected = HSLAStrings[indexSelected];
    assert.equal(actual, expected);
  });

  const indexToChoose = 5;

  this.set('indexToChoose', indexToChoose);
  this.set('colorHSLAs', HSLAStrings);

  this.render(hbs`{{color-palette-menu-widget
    colorHSLAs=colorHSLAs
    onColorSelected=(action selectColor indexToChoose)
  }}`);

  const itemElemToSelect = getNode(this).querySelectorAll(SELECTORS.menuItem)[indexToChoose];
  itemElemToSelect.click();

});
