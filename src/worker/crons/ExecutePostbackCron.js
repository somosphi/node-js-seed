const Cron = require('./Cron');

class ExecutePostbackCron extends Cron {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    super('*/30 * * * * *');
    this.postbackService = container.postbackService;
  }

  runner() {
    return this.postbackService.executePostbacks();
  }
}

module.exports = ExecutePostbackCron;
