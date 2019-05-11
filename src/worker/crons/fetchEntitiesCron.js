const Cron = require('../Cron');
const { entityService } = require('../../container');
const logger = require('../../logger');

const fetchEntitiesCron = new Cron('* * * * *', async () => {
  try {
    const fetchResult = await entityService.fetchFromPlaceholderApi();
    logger.info(`Fetched ${fetchResult.writedCount} entities`);
  } catch (err) {
    logger.error(`Failed fetching entities (errMessage=${err.message})`);
  }
});

module.exports = fetchEntitiesCron;
