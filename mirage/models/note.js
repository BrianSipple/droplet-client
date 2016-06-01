import { Model, belongsTo, hasMany } from 'ember-cli-mirage';


export default Model.extend({
  collaborators: hasMany('user'),
  notebook: belongsTo('notebook'),
  tag: hasMany('tag'),
  activeThemeColor: belongsTo('theme-color'),
});
