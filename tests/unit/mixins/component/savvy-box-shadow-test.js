import Ember from 'ember';
import ComponentSavvyBoxShadowMixin from 'droplet/mixins/component/savvy-box-shadow';
import { module, test } from 'qunit';
import styleConstants from 'droplet/utils/constants/styles';

const { Object: EmberObject } = Ember;

const {
  classNames: { BOX_SHADOW_DEPTH_PREFIX },
  DEFAULT_BOX_SHADOW_DEPTH,
  MAX_BOX_SHADOW_DEPTH,
} = styleConstants;

const ComponentSavvyBoxShadowObject = EmberObject.extend(ComponentSavvyBoxShadowMixin);


let actual, expected, subject;

module('Unit | Mixin | component/savvy box shadow');

// Replace this with your real tests.
test(`computing a class name for savvy box-shadows according \
  when the value is within the supported range`, function(assert) {

  subject = ComponentSavvyBoxShadowObject.create();

  expected = `${BOX_SHADOW_DEPTH_PREFIX}-${DEFAULT_BOX_SHADOW_DEPTH}`;
  actual = subject.get('boxShadowClassName');
  assert.equal(actual, expected);
});

test('capping depth at a maximum', function (assert) {
  subject = ComponentSavvyBoxShadowObject.create({ boxShadowDepth: MAX_BOX_SHADOW_DEPTH + 9 });

  expected = `${BOX_SHADOW_DEPTH_PREFIX}-${MAX_BOX_SHADOW_DEPTH}`;
  actual = subject.get('boxShadowClassName');
  assert.equal(actual, expected);
});

test('setting negative values to 0', function (assert) {
  subject = ComponentSavvyBoxShadowObject.create({ boxShadowDepth: -9 });

  expected = `${BOX_SHADOW_DEPTH_PREFIX}-0`;
  actual = subject.get('boxShadowClassName');
  assert.equal(actual, expected);
});
