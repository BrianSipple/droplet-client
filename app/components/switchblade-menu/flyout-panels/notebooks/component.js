import Ember from 'ember';

const {
  Component,
  computed: { readOnly }
} = Ember;


export default Component.extend({

  classNames: ['c-switchblade-menu-notebooks-flyout-panel'],

  activeMenuItemIndex: null,
  previousMenuItemIndex: null,
  panelData: null,
  selectedNotebook: null,
  isShowingNewNotebookItemForm: false,


  notebooks: readOnly('panelData'),

  actions: {

  },
});
