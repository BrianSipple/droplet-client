import Ember from 'ember';

const { run } = Ember;

const DEFAULT_USER_ATTRS = {
  id: '1',
  username: 'pColson',
  firstName: 'Phil',
  lastName: 'Colson',
};


function createCurrentUser(application, attrs = {}) {
  let user;

  run(() => {
    user = application.__container__.lookup('service:store').createRecord('user', attrs);
  });

  server.create('user', user);

  return user;
}

function setCurrentUser (application, user) {
  const currentUserService = application.__container__.lookup('service:currentUser');

  run(() => {
    currentUserService.set('content', user);
  });
}

function getCurrentUser (application) {
  return application.__container__.lookup('service:currentUser');
}

function wireUpCurrentUser (application, userAttrs = DEFAULT_USER_ATTRS) {
  let user;

  run(() => {
    user = createCurrentUser(application, userAttrs);
    setCurrentUser(application, user);
  });

  return user;
}

export default {
  createCurrentUser,
  setCurrentUser,
  getCurrentUser,
  wireUpCurrentUser,
};
