import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';
import bindTestingDataAttributes from 'droplet/tests/helpers/bind-testing-data-attributes';


const { run, A } = Ember;

/* eslint max-len: 0 */
const flyoutMenuItems = A([
  { routeName: 'protected.notebooks', title: 'Notebooks', isActive: true },
  { routeName: 'protected.notes', title: 'Notes', isActive: false },
  { routeName: 'protected.tags', title: 'Tags', isActive: false },
  { routeName: 'protected.ponds', title: 'Ponds', isActive: false },
]);

const auxiliaryTabItems = A([
  { routeName: 'protected.notebooks', title: 'Notebooks' },
  { routeName: 'protected.notes', title: 'Notes' },
  { routeName: 'protected.tags', title: 'Tags' },
  { routeName: 'protected.ponds', title: 'Ponds' },
]);

const SELECTORS = {
  menuButton: '[data-test-selector="c-switchblade-menu-handle__menu-button"]',
  auxiliaryTabButton: '[data-test-selector="c-switchblade-menu-handle__auxiliary-tab-button"]',
};

let actual, expected;

moduleForComponent('switchblade-menu/handle', 'Integration | Component | switchblade menu/handle', {
  integration: true,
  beforeEach() {
    bindTestingDataAttributes();
  },
});

test('rendering a bar of navigation "flyoutMenuItems" that toggle the sidenav flyout', function(assert) {

  this.set('flyoutMenuItems', flyoutMenuItems);
  this.render(hbs`{{switchblade-menu/handle flyoutMenuItems=flyoutMenuItems}}`);

  const handleElem = getNode(this);
  expected = flyoutMenuItems.length;
  actual = handleElem.querySelectorAll(SELECTORS.menuButton).length;
  assert.equal(actual, expected);
});


test('rendering a bar of navigation "auxiliaryTabItems" that route to a certain page', function(assert) {

  this.set('auxiliaryTabItems', auxiliaryTabItems);
  this.render(hbs`{{switchblade-menu/handle auxiliaryTabItems=auxiliaryTabItems}}`);

  const handleElem = getNode(this);
  expected = auxiliaryTabItems.length;
  actual = handleElem.querySelectorAll(SELECTORS.auxiliaryTabButton).length;
  assert.equal(actual, expected);
});


test('calling onRouteSelection with a `routeName` in its `auxiliaryTabItemSelected` action', function (assert) {

  const routeToSelect = auxiliaryTabItems[2].routeName;

  this.set('externalOnRouteSelection', (routeName) => {
    expected = routeToSelect;
    actual = routeName;
    assert.equal(actual, expected);
  });
  this.set('auxiliaryTabItems', auxiliaryTabItems);

  this.render(hbs`{{switchblade-menu/handle auxiliaryTabItems=auxiliaryTabItems onRouteSelection=(action externalOnRouteSelection) }}`);

  const butttonToClick = getNode(this).querySelectorAll(SELECTORS.auxiliaryTabButton)[2];
  butttonToClick.click();

});


test(`calling \`onMainMenuItemSelected\` with the index of the item selected`, function (assert) {
  assert.expect(2);

  const startingActiveItemIndex = 2;
  const newActiveItemIndex = 0;

  flyoutMenuItems.setEach('isActive', false);
  flyoutMenuItems[startingActiveItemIndex].isActive = true;

  this.set('flyoutMenuItems', flyoutMenuItems);
  this.set('previousMenuItemIndex', 1);
  this.set('activeMenuItemIndex', startingActiveItemIndex);

  this.set('onMainMenuItemSelected', (index, menuItem) => {
    expected = newActiveItemIndex;
    actual = index;
    assert.equal(actual, expected);

    expected = flyoutMenuItems[newActiveItemIndex];
    actual = menuItem;
    assert.deepEqual(actual, expected);
  });

  this.render(hbs`{{switchblade-menu/handle
      flyoutMenuItems=flyoutMenuItems
      activeMenuItemIndex=activeMenuItemIndex
      previousMenuItemIndex=previousMenuItemIndex
      onMainMenuItemSelected=onMainMenuItemSelected
    }}
  `);

  const butttonToClick = getNode(this).querySelectorAll(SELECTORS.menuButton)[newActiveItemIndex];

  run(() => {
    butttonToClick.click();
  });

});
