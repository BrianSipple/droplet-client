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

  const userPrivateInfo = server.create('user-private-info', {
    userId: user1.id,
    email: 'bsipple57@gmail.com',
    subscriptionType: subscriptionTypes.INDIVIDUAL_PREMIUM,
    role: userRoles.ADMIN,
  });

  const userNotebook1 = server.create('notebook', {
    title: 'Tracking Hydra',
    ownerId: user1.id,
    lastUpdatedAt: new Date(),
  });

  // const userNotebook1Note = server.create('note', {
  //   title: 'Paris',
  //   content: 'Know operatives: N/A',
  //   notebookId: userNotebook1.id,
  //   ownerId: user1.id,
  //   lastUpdatedAt: new Date(),
  // });
  const userNotebooks = server.createList('notebook', 10, { ownerId: user1.id });
  const userNotes = server.createList('note', 10, { notebookId: userNotebook1.id }, );

  server.createList('theme-color', 10);

  // Create more miscellaneous data to help verify
  // that we're selecting the right stuff
  server.createList('user', 10);
  server.createList('user-private-info', 10);
  server.createList('notebook', 10);
  server.createList('tag', 10);
  server.createList('notification', 10);

}
