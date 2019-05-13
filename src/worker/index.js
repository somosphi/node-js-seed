const crons = require('./crons');

exports.crons = crons;

/**
 * @return {void}
 */
const start = () => {
  crons.filter(cron => !cron.running).forEach(cron => cron.start());
};

exports.start = start;

/**
 * @return {void}
 */
const stop = () => {
  crons
    .filter(cron => cron.running)
    .forEach(cron => cron.stop());
};

exports.stop = stop;
