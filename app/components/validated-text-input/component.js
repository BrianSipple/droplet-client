import Ember from 'ember';
import XTextInput from 'droplet/components/x-text-input/component';

const { computed } = Ember;


export default XTextInput.extend({

  errors: null,

  _errorMessages: computed('errors.[]', {
    get() {
      return (this.get('errors') || []).join(', ');
    }
  })
});
