import Ember from 'ember';

const { get } = Ember;
const { keys } = Object;

/**
 * `asepectPairs` should be a key-value hash mapping
 * relationship descriptors to their expected values
 *
 * http://emberjs.com/api/data/classes/DS.Model.html#property_relationshipsByName
 */
export default function assertModelRelationship(assert, model, aspectPairs /* , errorMessage */) {
  const relationship = get(model, 'relationshipsByName').get(aspectPairs.key);

  keys(aspectPairs).forEach((relationshipAspect) => {
    assert.equal(relationship[relationshipAspect], aspectPairs[relationshipAspect]);
  });
}
