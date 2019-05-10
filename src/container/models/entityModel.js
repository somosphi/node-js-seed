
/**
 * @param {import('knex')} database
 * @param {Number} id
 */
const getById = (database, id) => database.table('entities').where('id', id).first();

exports.getById = getById;

/**
 * @typedef CreateEntityRecordDto
 * @type {Object}
 * @property {String} name
 * @property {String} documentNumber
 * @property {String} documentType
 */

/**
 * @param {import('knex')} database
 * @param {CreateEntityRecordDto} data
 */
const create = (database, data) => database.table('entities').insert(data);

exports.create = create;
