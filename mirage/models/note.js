import Ember from 'ember';
import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

const { computed: { alias } } = Ember;


export default Model.extend({
  collaborators: hasMany('user'),
  notebook: belongsTo('notebook'),
  tag: hasMany('tag'),
  themeColor: belongsTo('theme-color'),

  owner: alias('notebook.owner')
});
