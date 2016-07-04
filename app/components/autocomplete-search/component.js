import Ember from 'ember';
import keyCodeMap from 'droplet/utils/keycodes';
import { task, timeout } from 'ember-concurrency';
import uuid from 'ember-simple-uuid';

const {
  Component,
  computed,
  K,
  A,
  isArray,
  run,
  RSVP: { Promise },
} = Ember;

const { notEmpty, alias, bool } = computed;

const {
  BACKSPACE: KEYCODE_BACKSPACE,
  ENTER: KEYCODE_ENTER,
  ESCAPE: KEYCODE_ESCAPE,
  ARROW_UP: KEYCODE_ARROW_UP,
  ARROW_DOWN: KEYCODE_ARROW_DOWN,
} = keyCodeMap;

const KEYDOWN_EVENT_MAP = {
  [KEYCODE_BACKSPACE]: 'startBackspacing', // backspace
  [KEYCODE_ENTER]: 'selectOption',  // return
  [KEYCODE_ESCAPE]: 'exitSearch', // escape
  [KEYCODE_ARROW_UP]: 'focusPrevious', // up key
  [KEYCODE_ARROW_DOWN]: 'focusNext', // down key}
};


export default Component.extend({

  classNames: ['c-autocomplete-search'],
  attributeBindings: [
    'is-open',
    'aria-activedescendant',
    'aria-autocomplete',
    'aria-owns'
  ],

  inputValue: '',
  displayProperty: '',
  isAutocomplete: true,
  isBackspacing: false,
  isDropdownOpen: false,
  searchResults: null,
  activeDescendantId: null,
  focusedIndex: -1,
  selectedIndex: -1,
  'on-select': null,
  'on-input': null,
  onExitSearch: null,  // TODO: Implement

  /**
   * Tells screenreaders how to deal with this element.
   * http://www.w3.org/TR/wai-aria-practices/#combobox
   * http://www.w3.org/TR/wai-aria/roles#combobox
   */
  ariaRole: 'combobox',

  /**
   * Tells screenreaders that the element uses a list as well as inline auto
   * completion (updates text field, selects autocompleted portion).
   *
   * @property aria-autocomplete
   * @private
   */
  'aria-autocomplete': 'both',

  /**
   * Tells the screenreader which element is active in the list.
   *
   * @property aria-activedescendant
   * @private
   */
  'aria-activedescendant': alias('activeDescendantId'),


  'is-open': bool('isDropdownOpen'),
  hasSearchInput: notEmpty('inputValue'),
  numResults: alias('searchResults.length'),

  focusedOption: computed('searchResults.[]', 'focusedIndex', function focusedOption () {
    const focusedIndex = this.get('focusedIndex');

    return this.get('searchResults').objectAt(focusedIndex);
  }),


  handleNewInput: task(function *handleNewInputTask(newInput) {
    yield timeout(800);

    yield this.get('on-input')(newInput);

    this.set('inputValue', newInput);
    this.set('isDropdownOpen', true);
    this.set('focusedIndex', -1);

    run.scheduleOnce('afterRender', this, () => {
      this.set('isBackspacing', false);
    });

    return new Promise((resolve /* , reject */) => {
      const firstDropdownOption = this.get('searchResults.firstObject');

      if (firstDropdownOption) {
        const autoCompletedLabel = firstDropdownOption.get('title');

        this.set('inputValue', autoCompletedLabel);
        resolve({ highlightStart: newInput.length, highlightEnd: autoCompletedLabel.length });
      }
    });
  }).restartable(),

  startBackspacing () {
    this.set('isBackspacing', true);
  },

  selectOption (event) {
    event.preventDefault();

    this.set('selectedIndex', this.get('focusedIndex'));
  },

  closeDropdown () {
    this.set('isDropdownOpen', false);
    this.set('focusedIndex', -1);
  },

  exitSearch () {
    this.send('searchDidExit');
  },

  incrementFocus (increment) {
    const numResults = this.get('numResults');

    if (numResults) {
      // only update the index when we have results
      const focusedIndex = this.get('focusedIndex');
      const newIndex = this.get('isDropdownOpen') ?
        (focusedIndex + increment) % numResults
        :
        focusedIndex;

      this.set('focusedIndex', newIndex);
    }
  },

  focusPrevious (event) {
    event.preventDefault();
    this.incrementFocus(-1);
  },

  focusNext (event) {
    event.preventDefault();
    this.incrementFocus(1);
  },


  keyDown (event) {
    const keyCode = event.keyCode || event.which || '';
    const method = KEYDOWN_EVENT_MAP[keyCode];

    if (method) {
      this[method](event);
    }
  },


  init () {
    this._super(...arguments);

    this['on-select'] = (typeof this['on-select'] === 'function') ? this['on-select'] : K;
    this['on-input'] = (typeof this['on-input'] === 'function') ? this['on-input'] : K;
    this.onExitSearch = (typeof this.onExitSearch === 'function') ? this.onExitSearch : K;
    this.searchResults = isArray(this.searchResults) ? this.searchResults : A();

    this._initializeIds();
  },


  actions: {

    toggleDropdown () {
      this.toggleProperty('isDropdownOpen');
    },

    selectionWasMade (item) {
      const inputValue = item.get(this.get('displayProperty'));

      this.get('on-select')(item);
      this.set('isDropdownOpen', false);
      this.set('inputValue', inputValue);
    },

    processNewInput (newInput) {
      return this
        .get('handleNewInput')
        .perform(newInput)
        .catch(err => err); // TODO: Explore better patterns for handling TaskCancellatoin (https://github.com/machty/ember-concurrency/pull/50)
    },

    searchDidExit () {
      this.closeDropdown();
      this.get('searchDidExit')();
    },
  },


  /**
   * For proper accessability, we can automate the schronization of unique document IDs
   * for this component set's results list
   * (so the input can specify an `aria-owns`),
   * as well as that list's items (so the container can specify an `aria-activedescendant`)
   */
  _initializeIds() {
    this.listElementId = `autocomplete-list-${uuid().slice(0, 8)}`;
    this.listItemIdPrefix = `${this.listElementId}--item-`;
    this.activeDescendantId = `${this.listItemIdPrefix}${this.focusedIndex}`;
  }
});
