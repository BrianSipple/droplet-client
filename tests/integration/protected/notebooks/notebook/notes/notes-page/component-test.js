import Ember from 'ember';
// import { moduleForComponent, test } from 'ember-qunit';
import { moduleForComponent } from 'ember-qunit';
import test from 'droplet/tests/ember-sinon-qunit/test';
import hbs from 'htmlbars-inline-precompile';
import getNode from 'droplet/tests/helpers/integration/get-node';
import moment from 'moment';
import startMirage from 'droplet/tests/helpers/start-mirage';
import bindTestingDataAttributes from 'droplet/tests/helpers/bind-testing-data-attributes';


const { Object: EmberObject, run } = Ember;

const SELECTORS = {
  toolbar: '[data-test-selector="notes-page__toolbar"]',
  notesCardSet: '[data-test-selector="notes-page__note-card-set"]'
};

const DataDown = EmberObject.extend({
  notebook: null,
  notes: null,
  currentNoteSortOption: null,
  currentNoteSortProperties: null
});

function createNotebookModel() {
  const notebook = server.create('notebook', { title: 'Seattle'});
  const notes = [
    server.create('note', { title: 'A', lastUpdatedAt: moment, createdAt: moment, notebook, }),
    server.create('note', { title: 'B', lastUpdatedAt: moment, createdAt: moment, notebook, }),
  ];

  notebook.notes = notes;

  return notebook;
}

function setUpData () {
  const notebook = createNotebookModel();

  return DataDown.create({
    notebook: notebook,
    notes: server.db.notes,  // a bit hacky here until Mirage has a `slice`able data structure for what's currently Collections
    currentNoteSortOption: notebook.currentNoteSortOption,
    currentNoteSortProperties: notebook.currentNoteSortProperties,
  });
}


let expected, actual, dataDown;

moduleForComponent('protected/notebooks/notebook/notes/notes-page', 'Integration | Component | protected/notebooks/notebook/notes/notes page', {
  integration: true,

  beforeEach() {
    startMirage(this.container);
    bindTestingDataAttributes();

    //this.notes = {};
    this.myName = 'Brian';
    // test.context = {
    //   foo: 'bar',
    //   ember: 'magic'
    // };
  }
});

test('rendering a toolbar for... tooling with notes and a body section for the notes list content', function (assert) {
  dataDown = setUpData();

  run(() => {
    this.set('dataDown', dataDown);
  });

  this.render(hbs`{{protected/notebooks/notebook/notes/notes-page
    notes=dataDown.notes
    noteSortOptions=dataDown.noteSortOptions
    currentSortOption=dataDown.currentNoteSortOption
    currentNoteSortProperties=dataDown.currentNoteSortProperties
    notebook=dataDown.notebook
  }}`);

  const notesPageElem = getNode(this);
  assert.equal(1, notesPageElem.querySelectorAll(SELECTORS.toolbar).length)
  assert.equal(1, notesPageElem.querySelectorAll(SELECTORS.notesCardSet).length);
});

// test('sorting notes accoring to the passed-in `currentNoteSortProperties`', function (assert) {
//
//   dataDown = setUpData();
//
//   // TODO: Delete this after making sure sinon is working proerly
//   assert.equal(this.myName, 'Brian');
//
//   this.set('dataDown', dataDown);
//   this.render(hbs`{{protected/notebooks/notebook/notes/notes-page
//     notes=dataDown.notes
//     noteSortOptions=dataDown.noteSortOptions
//     currentSortOption=dataDown.currentNoteSortOption
//     currentNoteSortProperties=dataDown.currentNoteSortProperties
//     notebook=dataDown.notebook
//   }}`);
//   const component = this.subject({
//     notes: dataDown.get('notes'),
//     noteSortOptions: dataDown.get('noteSortOptions'),
//     currentSortOption: dataDown.get('currentNoteSortOption'),
//     currentNoteSortProperties: dataDown.get('currentNoteSortProperties'),
//     notebook: dataDown.get('notebook'),
//   });
//
//
// });




// test('rendering an empty message when the component has no `sortedNotes`', function (assert) {
//
//
// });
