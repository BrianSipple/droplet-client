import Ember from 'ember';

const { Test: { registerHelper } } = Ember;
const { keys } =  Object;


function assertModelHasAttr(assert, model, attrName, errorMessage) {
  const expected = true;
  const actual = keys(model.toJSON()).indexOf(attrName) > -1;

  assert.equal(actual, expected, errorMessage);
}

registerHelper('assertModelHasAttr', assertModelHasAttr);
