/**
 * @template T
 * @typedef { T & { forUpdate: function(): T, forShare: function(): T }} TransactionQuery
 */

/**
 * @template T
 * @typedef {{ transacting: function(import('knex').Transaction): TransactionQuery<T> }} Transaction
 */

/**
 * @template T
 * @typedef {Promise<T> & Transaction<Promise<T>>} ResultTransaction
 */

/**
 * @template T
 */
class Model {
  /**
   * @param {String} tableName
   * @param {import('knex')} database
   */
  constructor(database, tableName) {
    this.tableName = tableName;
    this.database = database;
    this.transaction = this.database.transaction.bind(database);
  }

  /**
   * @return {import('knex').QueryBuilder}
   */
  get table() {
    return this.database(this.tableName);
  }

  /**
   * @return {ResultTransaction<T[]>}
   */
  all() {
    return this.table;
  }
}

module.exports = Model;
