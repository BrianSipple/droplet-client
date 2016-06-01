import Ember from 'ember';

const {
  Mixin,
  computed,
  run,
} = Ember;

export default Mixin.create({

  classNameBindings: ['currentAnimationClass', '_hasBeenActive::fresh'],

  activeMenuItemIndex: null,
  previousMenuItemIndex: null,
  isActive: false,


  _hasBeenActive: false,
  _isInPanelView: false,   // because `isVisible` belongs to Ember :)

  init () {
    this._super(...arguments);
  },

  // entranceAnimationClass: computed('isActive', function entranceAnimationClass () {
  //   const isActive = this.get('isActive');
  //
  //   if (isActive) {
  //
  //     const previousMenuItemIndex = this.get('previousMenuItemIndex');
  //     const activeMenuItemIndex = this.get('activeMenuItemIndex');
  //
  //     return previousMenuItemIndex < activeMenuItemIndex ?
  //       'slide-in-from-right'
  //       :
  //       'slide-in-from-left';
  //   }
  // }),
  //
  //
  // exitAnimationClass: computed('isExiting', function exitAnimationClass() {
  //   if (this.get('isExiting')) {
  //     const previousMenuItemIndex = this.get('previousMenuItemIndex');
  //     const activeMenuItemIndex = this.get('activeMenuItemIndex');
  //
  //     return previousMenuItemIndex < activeMenuItemIndex ?
  //       'slide-out-left'
  //       :
  //       'slide-out-right';
  //   }
  // }),

  currentAnimationClass: computed('isActive', function computeCurrentAnimationClass () {

    const previousMenuItemIndex = this.get('previousMenuItemIndex');
    const activeMenuItemIndex = this.get('activeMenuItemIndex');

    if (this.get('isActive')) {
      return previousMenuItemIndex < activeMenuItemIndex ?
        'slide-in-from-right'
        :
        'slide-in-from-left';

    } else {
      return previousMenuItemIndex < activeMenuItemIndex ?
        'slide-out-left'
        :
        'slide-out-right';
    }
  }),


  didReceiveAttrs () {
    this._super(...arguments);

    this._resolveCurrentActiveState();
  },


  _resolveCurrentActiveState () {
    const isActive = this.get('isActive');

    if (isActive) {

      if (!this.get('_isInPanelView')) {
        run.next(this, () => {
          this.set('_isInPanelView', true);
        });
      }

      if (!this.get('_hasBeenActive')) {
        this.set('_hasBeenActive', true);
      }

    } else {
      if (this.get('_isInPanelView')) {
        this.set('isExiting', true);
        run.next(this, () => {
          this.set('_isInPanelView', false);
        });
      }
    }
  },
});
