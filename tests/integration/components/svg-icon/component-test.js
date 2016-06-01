import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';

let actual, expected;


moduleForComponent('svg-icon', 'Integration | Component | svg icon', {
  integration: true
});

test(`rendering a <use> element with an \`xlink:href\`
  attribute of its provided \`iconURL\``, function(assert) {

  const iconPath = 'assets/icons.svg#eye-of-sauron';

  this.set('iconURL', iconPath);
  this.render(hbs`{{svg-icon iconURL=iconURL}}`);

  const sVGElem = getNode(this);
  const useElem = sVGElem.querySelector('use');

  expected = iconPath;
  actual = useElem.getAttribute('xlink:href');

  assert.equal(actual, expected);

});
