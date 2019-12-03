const apm = require('elastic-apm-node');
const env = require('./env');
const http = require('./http');
const worker = require('./worker');
const { logger } = require('./logger');

/* start service */
setImmediate(() => {
  worker.start();
  logger.info(__('worker.started', worker.crons.length));

  const canStartApm = !!(env.APM_TOKEN && env.APM_URL && env.SERVICE_URL);
  if (canStartApm) {
    apm.start({
      serviceName: env.SERVICE_URL,
      secretToken: env.APM_TOKEN,
      serverUrl: env.APM_URL,
    });
  }

  const server = http.listen(env.PORT, () => {
    logger.info(__('http.started', env.PORT));
    process.send('ready');
  });

  const onExitProcess = () => {
    server.close(() => {
      process.exit(0);
    });
  };

  /* process handler */
  process.stdin.resume();
  process.on('SIGINT', onExitProcess);
  process.on('SIGTERM', onExitProcess);

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled rejection (reason=${reason}, promise=${promise}`);
  });
});
