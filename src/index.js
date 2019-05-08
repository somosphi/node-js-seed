const env = require('./env');
require('./apmRegister');

const http = require('./http');
const worker = require('./worker');
const logger = require('./logger');
const eurekaRegister = require('./eurekaRegister');

/* start service */
setImmediate(() => {
  worker.startAll();
  logger.info(__('worker.started', worker.crons.length));

  const server = http.listen(env.PORT, () => {
    logger.info(__('http.started', env.PORT));
    process.send('ready');

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

  function exit() {
    server.close(() => {
      process.exit(0);
    });
  }

  /* process handler */
  process.stdin.resume();
  process.on('SIGINT', exit);
  process.on('SIGTERM', exit);

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
});
