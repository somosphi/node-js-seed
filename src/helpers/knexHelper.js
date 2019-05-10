/**
 * @param {import('knex')} knex
 * @param {import('knex').TableBuilder} tableBuilder
 * @param {String?} fieldName
 * @return {import('knex').ColumnBuilder}
 */
const addUpdatedAt = (knex, tableBuilder, fieldName = 'updatedAt') => tableBuilder
  .dateTime(fieldName)
  .notNullable()
  .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

exports.addUpdatedAt = addUpdatedAt;

/**
 * @param {import('knex')} knex
 * @param {import('knex').TableBuilder} tableBuilder
 * @param {String?} fieldName
 * @return {import('knex').ColumnBuilder}
 */
const addCreatedAt = (knex, tableBuilder, fieldName = 'createdAt') => tableBuilder
  .dateTime(fieldName)
  .notNullable()
  .defaultTo(knex.fn.now());

exports.addCreatedAt = addCreatedAt;
