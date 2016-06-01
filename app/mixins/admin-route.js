import Ember from 'ember';
import statusCodes from 'droplet/utils/status-codes';
import authConstants from 'droplet/utils/constants/auth';

const {
  Mixin,
  inject,
  RSVP: { Promise },
} = Ember;

const { roles: userRoles } = authConstants;


export default Mixin.create({

  SessionService: inject.service('session'),

  beforeModel (/* transition */) {

    debugger;

    // TODO: Probably delete this commented-out block -- I'm pretty sure this is what
    //       ember-simple-auth's AuthenticatedRouteMixin already gives us.
    // if (!this.get('SessionService.isAuthenticated')) {
    //
    //     // If the user isn't even signed in, reject with an "Unauthorized" status.
    //     // At the very least, your going to have to bring some credentials before
    //     // trying to get in
    //     return Ember.RSVP.reject({
    //         status: 'Unauthorized',
    //         code: STATUS_CODES.UNAUTHORIZED,
    //         message: 'Please login to access this route.'
    //     });
    // }

    return new Promise((resolve, reject) => {

      const currentUserRole = this.get('currentUser.role') || '';

      // If the user is signed in, but isn't an admin, reject with a
      // "Forbidden" status. We don't allow your kind around here.
      if (currentUserRole !== userRoles.ADMIN) {
        reject({
          status: 'Forbidden',
          code: statusCodes.FORBIDDEN,
          message: 'Sorry, but you are not allowed to access this page.',
        });
      }

      resolve();
    });
  },
});
