import Ember from 'ember';
import ENV from 'droplet/config/environment';
import authenticateHandler from './handlers/authenticate';
import notebooksHandler from './handlers/notebooks';
import notesHandler from './handlers/notes';

const { APP: { apis: { droplet: { HOST } } } } = ENV;
const { post: handleAuthenticatePost } = authenticateHandler;
const { get: handleNotebooksGet } = notebooksHandler;
const { get: handleNotesGet } = notesHandler;
const { isEmpty, isBlank } = Ember;

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.urlPrefix = HOST; // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = `api/v1`;    // make this `api`, for example, if your API is namespaced
  this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    For example:

    this.get('/posts');

    ... is equal to:

    this.get('/posts', (schema, request) => {
      return schema.post.all();
    });
  */


  this.get('/users', ({ users }, { queryParams }) => {
    if (!isEmpty(queryParams)) {
      if (!isBlank(queryParams.username)) {
        return users.where({ username: queryParams.username });
      }
    }

    return users.all();

  });

  this.post('/users');
  this.patch('/users/:id');
  this.get('/users/:id');
  this.delete('/users/:id');
  // this.passthrough('/users');


  this.get('/user-private-infos');
  this.post('/user-private-infos');
  this.patch('/user-private-infos');


  this.post('/authenticate', handleAuthenticatePost);
  // this.passthrough('/authenticate');


  this.get('/notebooks', handleNotebooksGet);

  this.post('/notebooks');
  this.get('/notebooks/:id' /* , { timing: 3000 } */);
  this.patch('/notebooks/:id');
  this.get('/notebooks/note/:id');

  this.get('/notes', handleNotesGet);
  this.post('/notes');
  this.get('/notes/:id' /* , { timing: 3000 } */);
  this.patch('/notes/:id');

  this.get('/tags');

  this.get('/theme-colors');



  /**
   * By default, Mirage throws an error if your Ember app makes a
   * request that doesn’t have a corresponding route handler defined.
   * To avoid this, tell Mirage to let unhandled requests pass through:
   */
   // this.passthrough();


}
