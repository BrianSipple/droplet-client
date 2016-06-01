import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  owner: belongsTo('user'),
  collaborators: hasMany('user'),
  notes: hasMany('note'),
});
