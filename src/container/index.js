const knex = require('knex');
const knexFile = require('../../knexfile');
const logger = require('../logger');
const { NODE_ENV } = require('../env');

/** Services Providers */
const entityServiceProvider = require('./providers/entityServiceProvider');

const database = knex(knexFile);
if (NODE_ENV === 'development') {
  database.on('query', (query) => {
    let { sql } = query;
    if (query.bindings) {
      query.bindings.forEach((binding) => {
        sql = sql.replace('?', binding);
      });
    }
    logger.info(sql);
  });
}

if (NODE_ENV === 'production') {
  database.migrate.latest();
}

/**
 * @typedef ContainerContext
 * @type {Object}
 * @property {import('knex')} database
 */

/** @type {ContainerContext} */
const context = {
  database,
};

module.exports = {
  entityService: entityServiceProvider(context),
};
