const env = require('./env');
require('./apmRegister');

process.stdin.resume();

const http = require('./http');
const worker = require('./worker');
const logger = require('./logger');
const eurekaRegister = require('./eurekaRegister');

function exit() {
  http.close(() => {
    process.exit(0);
  });
}

/* process handler */
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('SIGINT', exit);
process.on('SIGTERM', exit);

/* start service */
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
