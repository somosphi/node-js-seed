const apm = require('elastic-apm-node');
const { Eureka } = require('eureka-js-client');
const env = require('./env');
const http = require('./http');
const worker = require('./worker');
const logger = require('./logger');

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

  if (env.NODE_ENV === 'production') {
    const eureka = new Eureka({
      instance: {
        instanceId: `${env.HOSTNAME}:${env.SERVICE_URL}:${env.PORT}`,
        healthCheckUrl: `http://${env.SERVICE_URL}:${env.PORT}/status`,
        app: env.SERVICE_NAME,
        hostName: env.SERVICE_URL,
        ipAddr: '',
        statusPageUrl: `http://${env.SERVICE_URL}:${env.PORT}/info`,
        vipAddress: env.SERVICE_NAME,
        port: {
          $: env.PORT,
          '@enabled': true,
        },
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true,
      },
      eureka: {
        host: env.EUREKA_HOST,
        port: env.EUREKA_PORT,
        servicePath: '/service-discovery/eureka/apps/',
        maxRetries: 20,
        requestRetryDelay: 1000,
      },
    });

    eureka.start((err) => {
      if (err) {
        logger.error(__('eureka.error', err));
      } else {
        logger.info(__('eureka.started'));
      }
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
