/**
 * @param {import('knex')} database
 * @param {Number} id
 */
const getById = (database, id) => database
  .table('entities')
  .where('id', id)
  .first();

exports.getById = getById;

/**
 * @param {import('knex')} database
 * @param {String} email
 */
const getByEmail = (database, email) => database
  .table('entities')
  .where('email', email)
  .first();

exports.getByEmail = getByEmail;

/**
 * @param {import('knex')} database
 */
const getAll = database => database
  .table('entities');

exports.getAll = getAll;

/**
 * @typedef CreateEntityRecordDto
 * @type {Object}
 * @property {String} name
 * @property {String} email
 */

/**
 * @param {import('knex')} database
 * @param {CreateEntityRecordDto} data
 */
const create = (database, data) => database.table('entities').insert(data);

exports.create = create;

/**
 * @typedef UpdateEntityRecordDto
 * @type {Object}
 * @property {Number} id
 * @property {String} name
 * @property {String} email
 */

/**
 * @param {import('knex')} database
 * @param {UpdateEntityRecordDto} data
 */
const update = (database, { id, ...data }) => database
  .table('entities')
  .where('id', id)
  .update(data);

exports.update = update;
