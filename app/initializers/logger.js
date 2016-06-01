import Logger from 'droplet/logger/logger';


export function initialize(application) {
  const injectionName = 'logger:main';

  application.register(injectionName, Logger);

  application.inject('route', 'logger', injectionName);
  application.inject('component', 'logger', injectionName);
  application.inject('model', 'logger', injectionName);
}

export default {
  name: 'logger',
  initialize
};
