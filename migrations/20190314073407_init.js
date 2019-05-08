const { knexHelper } = require('../src/helpers');

/**
 * @param {import('knex')} knex
 */
const up = async (knex) => {
  await knex.schema.createTable('entity', (table) => {
    table.bigIncrements('id').unsigned();
    table.string('name', 350).notNullable();
    table.specificType('documentNumber', 'CHAR(14)').notNullable();
    table.enum('documentType', ['CPF', 'CNPJ']).notNullable();
    table.unique(['documentNumber', 'documentType']);
    knexHelper.addCreatedAt(knex, table);
    knexHelper.addCreatedAt(knex, table, { fieldName: 'createdAtLocal', convert: true });
    knexHelper.addUpdatedAt(knex, table);
    knexHelper.addUpdatedAt(knex, table, { fieldName: 'updatedAtLocal', convert: true });
  });
};

/**
 * @param {import('knex')} knex
 */
const down = async (knex) => {
  await knex.schema.dropTable('entity');
};

module.exports = { up, down };
