const { CronJob } = require('cron');
const logger = require('../../logger');

class Cron extends CronJob {
  constructor(cronTime, timeZone = 'Etc/UTC') {
    super(cronTime, async () => {
      try {
        await this.runner();
      } catch (err) {
        logger.error(err);
      }
    }, null, false, timeZone);
  }
}

module.exports = Cron;
