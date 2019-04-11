const env = require('./env');
const apm = require('elastic-apm-node');

if (env.APM_TOKEN && env.APM_URL) {
  apm.start({
    serviceName: env.SERVICE_URL,
    secretToken: env.APM_TOKEN,
    serverUrl: env.APM_URL,
  });
}

const http = require('./http');
const worker = require('./worker');
const logger = require('./logger');
const eurekaRegister = require('./eurekaRegister');

setImmediate(() => {
  worker.startAll();
  logger.info(__('worker.started', worker.crons.length));

  http.listen(env.PORT, () => {
    logger.info(__('http.started', env.PORT));

    if (env.NODE_ENV === 'production') {
      eurekaRegister()
        .then(() => {
          logger.info(__('eureka.started'));
        })
        .catch((err) => {
          logger.error(__('eureka.error', err));
        });
    }
  });
});
