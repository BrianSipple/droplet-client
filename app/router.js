import Ember from 'ember';
import ENV from 'droplet/config/environment';

const { Router } = Ember;

const AppRouter = Router.extend({
  location: ENV.locationType,
});

/* eslint array-callback-return: 0 */
AppRouter.map(function mapRouter() {
  this.route('about');
  this.route('homepage');
  this.route('register');
  this.route('login');
  this.route('logout');

  /* eslint func-names: 0 */
  /* eslint prefer-arrow-callback: 0 */
  /* eslint max-nested-callbacks: 0 */
  this.route('protected', { path: '' }, function () {

    this.route('notebooks', function () {
      this.route('notebook', { path: ':notebook_id' }, function () {
        this.route('notes', function () {
          // this.route('new');
          // this.route('note', { path: ':note_id' });
          // this.route('note.new', { path: '/note/new' });
        });
        this.route('note', { path: '/notes/:note_id' });
        this.route('note.new', { path: '/notes/new' });

        this.route('activity');
      });

    });

    this.route('dashboard');
    this.route('admin');
    this.route('tags');
    this.route('ponds');
    this.route('graphs');
    this.route('notifications');
    this.route('chat');
  });

});


export default AppRouter;
