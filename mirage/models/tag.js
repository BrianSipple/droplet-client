import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  notes: hasMany('note'),
  user: belongsTo('user'),
});
