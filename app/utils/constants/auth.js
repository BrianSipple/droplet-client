export default {

  authenticators: {
    oauth2: {
      headers: {},  // TODO: Custom request headers?
      IDENTIFICATION_FIELD: 'identification',
      PASSWORD_FIELD: 'password',
      TOKEN_PROPERTY_NAME: 'token'
    }
  },

  authorizers: {
    oauth2: {
      TOKEN_PROPERTY_NAME: 'token',
      ONE_TIME_TOKEN_PROPERTY_NAME: 'oneTimeToken',
      AUTHORIZATION_HEADER_NAME: 'Authorization',
      AUTHORIZATION_PREFIX: 'Bearer '
    }
  },

  roles: {
    ADMIN: 'admin',
    OWNER: 'owner',
    USER: 'user'
  },

  subscriptionTypes: {
    BASIC: 'basic',
    INDIVIDUAL_STANDARD: 'individualStandard',
    INDIVIDUAL_PREMIUM: 'individualPremium',
    TEAM_STANDARD: 'teamStandard',
    TEAM_PREMIUM: 'teamPremium'
  }

};
