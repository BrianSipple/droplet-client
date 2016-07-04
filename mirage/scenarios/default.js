import authConstants from 'droplet/utils/constants/auth';

const { roles: userRoles, subscriptionTypes } = authConstants;


export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  const user1 = server.create('user', {
    firstName: 'Phil',
    lastName: 'Colson',
    username: 'shieldDirector',
    password: 'seattle',
    twitterUsername: '@shield',
    bio: 'Director of S.H.I.E.L.D.',
    location: 'everywhere',
  });

  server.create('user-private-info', {
    userId: user1.id,
    email: 'bsipple57@gmail.com',
    subscriptionType: subscriptionTypes.INDIVIDUAL_PREMIUM,
    role: userRoles.ADMIN,
  });

  server.createList('theme-color', 10);

  // Create more miscellaneous data to help verify
  // that we're selecting the right stuff
  server.createList('user', 2);
  server.createList('user-private-info', 2);
  server.createList('tag', 10);
  server.createList('notification', 10);

}
