const {
  APM_TOKEN,
  APM_URL,
  SERVICE_URL,
} = require('./env');
const apm = require('elastic-apm-node');

if (APM_TOKEN && APM_URL && SERVICE_URL) {
  apm.start({
    serviceName: SERVICE_URL,
    secretToken: APM_TOKEN,
    serverUrl: APM_URL,
  });
}
