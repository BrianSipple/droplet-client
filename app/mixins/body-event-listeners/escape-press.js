import Ember from 'ember';

const { Mixin, K } = Ember;

/**
 * TODO: Would this be better off as a general `keydown` body listener?
 */
export default Mixin.create({

  onEscapePressed: null,
  _handleEscapePress: null,


  init () {
    this._super(...arguments);

    this._initListeners();
  },


  didInsertElement () {
    this._super(...arguments);

    this._setListeners();
  },


  willDestroyElement () {
    this._super(...arguments);

    this._removeListeners();
  },


  _initListeners () {
    this._handleEscapePress = function handleEscapePress (event) {
      const onEscapePressed = this.get('onEscapePressed');

      if (typeof this.onEscapePressed === 'function') {
        const keyCode = event.keyCode || event.which || '';

        if (keyCode == 27) {
          onEscapePressed(event);
        }
      }
    }.bind(this);
  },

  _setListeners () {
    document.body.addEventListener('keydown', this._handleEscapePress, false);
  },

  _removeListeners () {
    document.body.removeEventListener('keydown', this._handleEscapePress);

    this._handleEscapePress = null;
  },

});
