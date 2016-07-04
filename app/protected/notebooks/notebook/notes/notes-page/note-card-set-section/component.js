import Ember from 'ember';

const { Component } = Ember;


export default Component.extend({
  classNames: ['c-notes-page-note-card-set', 'u-fill-height', 'u-fill-width'],
  notes: null,

  actions: {
    toggleNoteColorPalette (note) {
      note.toggleProperty('isColorPaletteWidgetShowing');
    }
  }
});
