const { init } = require('@somosphi/logger');

const {
  AxiosLogger,
  ExpressLogger,
  Logger,
} = init({
  PROJECT_NAME: 'node-js-seed',
  OMIT_ROUTES: ['/status', '/info'],
});

module.exports = {
  axiosLogger: AxiosLogger,
  expressLogger: ExpressLogger,
  logger: Logger,
};
