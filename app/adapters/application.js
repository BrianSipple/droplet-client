import BaseAdapter from './base';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';



export default BaseAdapter.extend(DataAdapterMixin, {

  authorizer: 'authorizer:oauth2',

});
