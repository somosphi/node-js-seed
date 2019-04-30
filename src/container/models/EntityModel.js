const Model = require('./Model');
const { documentTypes } = require('../../enums');

/**
 * @typedef CreateEntity
 * @type {Object}
 * @property {String} name
 * @property {String} documentNumber
 * @property {String} documentType
 */

/**
 * @typedef Entity
 * @type {Object}
 * @property {Number} id
 * @property {String} name
 * @property {String} documentNumber
 * @property {String} documentType
 */

/**
 * @extends {Model<Entity>}
 */
class EntityModel extends Model {
  constructor(database) {
    super(database, 'entity');
  }

  /**
   * @param {Number} id
   * @return {import('./Model').ResultTransaction<Entity>}
   */
  getById(id) {
    return this.table.where('id', id).first([
      'id',
      'name',
      'documentNumber',
      'documentType',
    ]);
  }

  /**
   * @param {String} name
   * @param {String} documentNumber
   * @return {import('./Model').ResultTransaction<Entity>}
   */
  get(where) {
    return this.table
      .where(where)
      .first([
        'id',
        'name',
        'documentNumber',
        'documentType',
      ]);
  }

  /**
   * @param {CreateEntity} data
   * @return {import('./Model').ResultTransaction<Number[]>}
   */
  create({ name, documentNumber, documentType }) {
    return this.table.insert({
      name,
      documentNumber,
      documentType,
    }).returning('id');
  }
}

module.exports = EntityModel;
