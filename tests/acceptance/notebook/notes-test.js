import Ember from 'ember';
import test from 'droplet/tests/ember-sinon-qunit/test';
import { skip } from 'qunit';
import moduleForAcceptance from 'droplet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'droplet/tests/helpers/ember-simple-auth';
import sessionData from 'droplet/tests/helpers/payloads/session-data';
import currentUserHelpers from 'droplet/tests/helpers/current-user';
import RouteConstants from 'droplet/utils/constants/routes';
import noteSortingConstants from 'droplet/utils/constants/note-sorting';

const { queryParamCodes: noteSortQueryParamCodes, options: noteSortOptions, properties: noteSortProperties } = noteSortingConstants;
const { Object: EmberObject, computed: { sort } } = Ember;
const { GUEST_ROUTE } = RouteConstants;
const { wireUpCurrentUser } = currentUserHelpers;
const startingNotesCount = 10;

const SELECTORS = {
  noteCard: '[data-test-selector="notebook-notes-page__note-card"]',
  noteCardTitle: '[data-test-selector="note-card__title"]',
  noteOrderSelect: '[data-test-selector="notebook-notes-page__note-order-select"]',
  noteSearchInput: '[data-test-selector="notebook-notes-page__note-search-widget-input"]',
};

const TestData = EmberObject.extend({
  notebook: null,
  notes: null,
  noteSortProperties: Ember.A([]),
  sortedNotes: sort('notes', 'noteSortProperties'),
});

let actual, expected, message, app, currentUser, currentNoteSort, TEST_DATA, ROUTE_PATH;

function createData () {

  const notebook = server.create('notebook', {
    title: 'Seattle',
    ownerId: currentUser.get('id')
  });

  TEST_DATA = TestData.create({
    notebook,
    notes: server.createList('note', startingNotesCount, { notebookId: notebook.id }),
  });
}

function prepareState (application) {
  createData();
  ROUTE_PATH = `/notebooks/${TEST_DATA.get('notebook.id')}/notes`,
  authenticateSession(application);
}

function getNoteTitle (index = 0) {
  const noteElem = document.querySelectorAll(SELECTORS.noteCard)[index];
  return noteElem.querySelector(SELECTORS.noteCardTitle).textContent.trim();
}

function assertFirstNoteTitleMatch (assert, expected, message = '') {
  assert.equal(getNoteTitle(0), expected, message);
}

function assertLastNoteTitleMatch (assert, expected, message = '') {
  assert.equal(getNoteTitle(TEST_DATA.get('notes').length - 1), expected, message);
}


moduleForAcceptance('Acceptance | notebook/notes', {
  beforeEach () {
    app = this.application;
    currentUser = wireUpCurrentUser(app);
    this.foo = 42;
  }
});

test(`the route functions as an authenticated route`, async (assert) => {
  assert.expect(2);

  await visit(ROUTE_PATH);

  expected = `/${GUEST_ROUTE}`;
  actual = currentURL();
  assert.equal(actual, expected);

  await visit('/')

  prepareState(app);

  await visit(ROUTE_PATH);

  expected = ROUTE_PATH;
  actual = currentURL();
  assert.equal(actual, expected);
});


test(`the page contains a list of the notebook's notes`, async (assert) => {
  prepareState(app);
  await visit(ROUTE_PATH);

  assertNodeCount(assert, SELECTORS.noteCard, startingNotesCount);
});


skip(`the page's list of notes is sorted
according to the user's current sort selection`, async (assert) => {
  prepareState(app);
  const noteSortOptions = TEST_DATA.get('notebook').noteSortOptions;

  await visit(ROUTE_PATH);

  assert.equal(currentURL(), ROUTE_PATH, 'url for main notes page contains no query by default');
  message = 'Notes default to being sorted by the most recently updated note';
  assertFirstNoteTitleMatch(assert, TEST_DATA.get('sortedNotes').objectAt(0).title, message);
  assertLastNoteTitleMatch(assert, TEST_DATA.get('sortedNotes').objectAt(startingNotesCount - 1).title, message);

  noteSortOptions.forEach(async (sortOption) => {
    await fillIn(SELECTORS.noteOrderSelect, sortOption.code);

    message = `Notes are sorted in order of ${sortOption.label} when the corresponding sort select option is selected`;
    TEST_DATA.set('noteSortProperties', sortOption.properties.split(','));
    TEST_DATA.get('sortedNotes').sort();

    await assert.equal(currentURL(), `${ROUTE_PATH}?sort=${sortOption.code}`, `url for main notes page contains the \`${sortOption.code}\` query`);
    await assertFirstNoteTitleMatch(assert, TEST_DATA.get('sortedNotes').objectAt(0).title, message);
    await assertLastNoteTitleMatch(assert, TEST_DATA.get('sortedNotes').objectAt(startingNotesCount - 1).title, message);
  });
});


test(`updating the URLs query params when a new note sort option is selected`, async function (assert) {
  prepareState(app);

  const noteSortOptions = TEST_DATA.get('notebook').noteSortOptions;

  await visit(ROUTE_PATH);
  assert.equal(currentURL(), ROUTE_PATH, 'url for main notes page contains no query by default');

  noteSortOptions.forEach(async (sortOption) => {
    await fillIn(SELECTORS.noteOrderSelect, sortOption.code);
    await assert.equal(currentURL(), `${ROUTE_PATH}?sort=${sortOption.code}`, `url for main notes page contains the \`${sortOption.code}\` query`);
  });

});


test(`the page's list of notes is filtered as the user begins
typing into the note search input`, async (assert) => {
  prepareState(app);

  TEST_DATA.get('sortedNotes').forEach((note, idx, notes) => {
    note.title = idx >= (notes.length / 2) ? 'Seattle' : 'San Francisco';
    note.save();
  });

  await visit(ROUTE_PATH);

  await fillIn(SELECTORS.noteSearchInput, 's');
  assertNodeCount(assert, SELECTORS.noteCard, startingNotesCount);

  // await fillIn(SELECTORS.noteSearchInput, 'e');
  await fillIn(SELECTORS.noteSearchInput, 'z');
  assertNodeCount(assert, SELECTORS.noteCard, startingNotesCount / 2);
});
