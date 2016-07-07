import Ember from 'ember';

const {
  Component,
  inject: { service },
  computed,
  K,
  String: { htmlSafe }
} = Ember;

const { map, notEmpty, and, alias, or } = computed;

const SELECTORS = {
  colorPaletteToggleElem: '.js-color-pallete-select',
};


export default Component.extend({

  ThemeColorService: service('theme-color'),
  attributeBindings: ['style'],
  classNames: [
    'c-note-card',
    'o-flex-grid',
    'o-flex-grid--auto',
    'a-trans-ease-colorShift',
    'u-relative',
    'u-pt1',
    'u-pr2',
    'u-pb1',
    'u-pl2'
  ],

  onThemeColorSelected: null,
  updateNoteData: null,
  note: null,
  shouldShowColorPaletteWidget: false,
  colorPaletteToggleSelector: null,
  isCardTitleBeingEdited: false,


  noteThemeColors: map('ThemeColorService.noteThemeColors', function noteThemeColors(color) {
    return color.get('HSLAString');
  }),

  activeNoteThemeColor: alias('note.activeThemeColor.HSLAString'),
  hasThemeColors: notEmpty('noteThemeColors'),
  isColorPaletteWidgetShowing: and('shouldShowColorPaletteWidget', 'hasThemeColors'),

  isBeingEdited: or('isCardTitleBeingEdited'),

  style: computed('activeNoteThemeColor', {
    get() {
      const backgroundHSLA = this.get('activeNoteThemeColor') || 'initial';

      return htmlSafe(`background-color: ${backgroundHSLA};`);
    }
  }),


  init () {
    this._super(...arguments);

    this.onThemeColorSelected = (typeof this.onThemeColorSelected === 'function') ? this.onThemeColorSelected : K;
    this.updateNoteData = (typeof this.updateNoteData === 'function') ? this.updateNoteData : K;
  },

  didInsertElement () {
    this._super(...arguments);

    this.set('colorPaletteToggleSelector', `#${this.elementId} ${SELECTORS.colorPaletteToggleElem}`);
  },


  // onNotePropChangedFromCard (propName, newValue) {
  //   if (newValue) {
  //     const note = this.get('note');
  //     const oldValue = note.get(propName);
  //
  //     if (oldValue !== newValue) {
  //       note.set(propName, newValue);
  //       return this.send('noteDataDidUpdate')(note);
  //     }
  //   }
  // },


  actions: {

    openColorPaletteWidget () {
      this.set('shouldShowColorPaletteWidget', true);
    },

    toggleNoteColorPalette (/* note */) {
      this.toggleProperty('shouldShowColorPaletteWidget');
    },

    themeColorWasSelected (colorHSLAString) {
      const note = this.get('note');
      const currentColor = note.get('activeThemeColor');
      const noteThemeColors = this.get('ThemeColorService.noteThemeColors');
      const selectedColor = noteThemeColors.filter(color => color.get('HSLAString') === colorHSLAString)[0];

      if (currentColor !== selectedColor) {
        note.set('activeThemeColor', selectedColor);
        this.get('updateNoteData')(note, true);
      }
    },

    noteTitleUpdatedFromCard (newValue) {
      const note = this.get('note');

      note.set('title', newValue.trim());
      this.get('updateNoteData')(note);
    }
  }
});
