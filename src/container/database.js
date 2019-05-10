const knex = require('knex');
const knexFile = require('../../knexfile');
const logger = require('../logger');
const { NODE_ENV } = require('../env');

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

module.exports = database;
