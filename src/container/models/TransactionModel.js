const Model = require('./Model');

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
class WalletService extends Model {
  constructor(database) {
    super(database, 'entity');
  }

  /**
   * @param {Number} id
   * @return {import('./Model').ResultTransaction<Entity>}
   */
  getById(id) {
    return this.table.where('id', id).first();
  }

  /**
   * @param {String} name
   * @param {String} documentNumber
   * @return {import('./Model').ResultTransaction<Entity>}
   */
  get(name, documentNumber) {
    return this.table
      .where('name', name)
      .where('documentNumber', documentNumber)
      .first();
  }

  /**
   * @param {String} name
   * @param {String} documentNumber
   * @return {import('./Model').ResultTransaction<Number[]>}
   */
  create(name, documentNumber) {
    let documentType = null;
    switch (documentNumber.length) {
      case 11:
        documentType = documentTypes.CPF;
        break;
      case 14:
        documentType = documentTypes.CNPJ;
        break;
      default:
        documentType = null;
        break;
    }

    return this.table.insert({
      name,
      documentNumber,
      documentType,
    });
  }
}

module.exports = WalletService;
