const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex
 */
const up = async (knex) => {
  await knex.schema.createTable('entities', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table);
  });
};

/**
 * @param {import('knex')} knex
 */
const down = async (knex) => {
  await knex.schema.dropTable('entities');
};

module.exports = { up, down };
