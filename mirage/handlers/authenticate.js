import Mirage from 'ember-cli-mirage';

const { Response: MirageResponse } = Mirage;


export default {

  post: function authenticatePost ({ db }, request) {
    // TODO: Make sure we match both id and password?
    const { identification /* , password */ } = JSON.parse(request.requestBody);
    const userId = db.users.where({ username: identification })[0].id;

    return new MirageResponse(200, {}, {
      success: true,
      userId,
      token: 'mirageDevToken'
    });
  },
};
