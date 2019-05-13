const fetchEntitiesCron = require('./fetchEntitiesCron');

/**
 * @type {import('../Cron')[]} crons
 */
const crons = [
  fetchEntitiesCron,
];

module.exports = crons;
