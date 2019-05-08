const env = require('./env');
const { Eureka } = require('eureka-js-client');

module.exports = () => new Promise((resolve, reject) => {
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
        '@enabled': 'true',
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

  eureka.start((error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});
