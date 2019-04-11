class CronManager {
  /**
   * @param {import('./crons/Cron')[]} crons
   */
  constructor(crons) {
    this.crons = crons;
  }

  startAll() {
    this.crons
      .filter(cron => !cron.running)
      .forEach(cron => cron.start());
  }

  stopAll() {
    this.crons
      .filter(cron => cron.running)
      .forEach(cron => cron.stop());
  }

  get(cronClass) {
    return this.crons.find(cron => cron instanceof cronClass);
  }
}

module.exports = CronManager;
