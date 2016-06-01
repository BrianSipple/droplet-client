import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  userPrivateInfo: belongsTo(),
  notebooks: hasMany('notebook', { inverseOf: 'owner' }),  // NOTE: `inverseOf` will soon be renamed to `inverse`
  tags: hasMany('tag'),
});
