const { CronJob } = require('cron');
const { logger } = require('../logger');

class Cron extends CronJob {
  /**
   * @param {String} cronTime
   * @param {Function} callback
   */
  constructor(cronTime, callback) {
    super(cronTime, async () => {
      try {
        await callback();
      } catch (err) {
        logger.error(err);
      }
    }, null, false, 'Etc/UTC');
  }
}

module.exports = Cron;
