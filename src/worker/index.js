const container = require('../container');
const CronManager = require('./CronManager');

/** Crons */
const ExecutePostbackCron = require('./crons/ExecutePostbackCron');

module.exports = new CronManager([
  new ExecutePostbackCron(container),
]);
