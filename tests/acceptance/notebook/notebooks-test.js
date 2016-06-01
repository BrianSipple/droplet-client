import { test } from 'qunit';
import moduleForAcceptance from 'droplet/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'droplet/tests/helpers/ember-simple-auth';
import sessionData from 'droplet/tests/helpers/payloads/session-data';
import currentUserHelpers from 'droplet/tests/helpers/current-user';
import RouteConstants from 'droplet/utils/constants/routes';

const { GUEST_ROUTE } = RouteConstants;
const { wireUpCurrentUser } = currentUserHelpers;
const KEYCODE_ENTER = 13;
const startingRoutePath = '/notebooks';
const newNoteBookTitle = 'Seattle';
const newNoteTitle = 'Cafes';
const startingNotebooksCount = 10;

const SELECTORS = {
  notebookListItem: '[data-test-selector="sidenav__notebook-item"]',
  expandNewNotebookForm: '[data-test-selector="sidenav__toggle-new-notebook-form"]',
  newNotebookForm: '[data-test-selector="sidenav__new-notebook-form"]',
  newNoteForm: '[data-test-selector="notebook-notes-page__new-note-form"]',
  newNoteTitleInput: '[data-test-selector="notebook-notes-page__new-note-title-input"]',
  notesPageNoteCard: '[data-test-selector="notebook-notes-page__note-card"]',
};

let actual, expected, app, currentUser;

function setupState () {
  authenticateSession(app, sessionData);

  return server.createList('notebook', startingNotebooksCount, { ownerId: currentUser.id });
}


moduleForAcceptance('Acceptance | notebooks', {
  beforeEach() {
    app = this.application;
    currentUser = wireUpCurrentUser(app);
  },
});

test('visiting /notebooks requires authentication', async function (assert) {
  assert.expect(2);

  await visit(startingRoutePath);

  actual = currentURL();
  expected = `/${GUEST_ROUTE}`;
  assert.equal(actual, expected);


  await visit('/');
  authenticateSession(app);
  await visit(startingRoutePath);

  actual = currentURL();
  expected = startingRoutePath;
  assert.equal(actual, expected);
});


test(`Rendering a list of notebooks into the sidenav`, async function (assert) {
  assert.expect(1);
  setupState();

  await visit(startingRoutePath);

  assertNodeCount(assert, SELECTORS.notebookListItem, startingNotebooksCount);

});


test(`Creating a new notebook by entering a title into the list form`, async function (assert) {
  assert.expect(1);
  setupState();

  await visit(startingRoutePath);
  await click(SELECTORS.expandNewNotebookForm);

  /**
   * Currently, we're using the ember-content-editable addon for this element,
   * which seems to have a way of updating its internal "value" that doesn't quite
   * gel with sending keyup events to it. As a workaround, we can update `textContent` directly,
   * and then send an empty `keyup` event to the component, which will cause it to read the textContent
   * and update its value.
   */
  document.querySelector(SELECTORS.newNotebookForm).textContent = newNoteBookTitle;
  await triggerEvent(SELECTORS.newNotebookForm, 'keyup');

  await triggerEvent(SELECTORS.newNotebookForm, 'keydown', { keyCode: KEYCODE_ENTER });

  assertNodeCount(assert, SELECTORS.notebookListItem, startingNotebooksCount + 1);
});


test('selecting a notebook from the sidenav and transitioning to its details page', async function (assert) {
  assert.expect(1);
  setupState();

  await visit(startingRoutePath);
  await click(SELECTORS.notebookListItem);  // select the first item

  expected = `/notebooks/1`;
  actual = currentURL();
  assert.equal(actual, expected);

});

test('visiting the details page of a notebook', async function(assert) {
  assert.expect(2);
  setupState();

  await visit(`/notebooks/1/notes`);
  assertNodeCount(assert, SELECTORS.notesPageNoteCard, 0, 'The notes page for an empty notebook contains no note cards');

  debugger;
  await fillIn(SELECTORS.newNoteTitleInput, newNoteTitle);
  await submit(SELECTORS.newNoteForm);

  expected = 1;
  assertNodeCount(assert, SELECTORS.notesPageNoteCard, 1, 'A note card is posted to the page after the title form is submitted');

});
