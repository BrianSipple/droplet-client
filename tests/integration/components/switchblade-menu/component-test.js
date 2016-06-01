import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

const { run } = Ember;

const CLASS_NAMES = {
  collasped: 'is-flyout-collapsed',
  expanded: 'is-flyout-expanded',
};

let actual, expected;

moduleForComponent('switchblade-menu', 'Integration | Component | switchblade menu', {
  integration: true
});

test('toggling classes according to `isFlyoutOpen`', function(assert) {

  this.set('isFlyoutOpen', false);
  this.render(hbs`{{switchblade-menu isFlyoutOpen=isFlyoutOpen}}`);

  const flyoutElem = getNode(this);


  expected = true;
  actual = flyoutElem.classList.contains(CLASS_NAMES.collasped);
  assert.equal(actual, expected);

  expected = false;
  actual = flyoutElem.classList.contains(CLASS_NAMES.expanded);
  assert.equal(actual, expected);


  run(() => {
    this.set('isFlyoutOpen', true);
    this.render(hbs`{{switchblade-menu isFlyoutOpen=isFlyoutOpen}}`);
  });

  expected = true;
  actual = flyoutElem.classList.contains(CLASS_NAMES.expanded);
  assert.equal(actual, expected);

  expected = false;
  actual = flyoutElem.classList.contains(CLASS_NAMES.collasped);
  assert.equal(actual, expected);
});
