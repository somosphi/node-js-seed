const { entityModel } = require('../models');
const database = require('../database');

const {
  ResourceNotFoundError,
} = require('../../errors');

/**
 * @typedef CreateEntityDto
 * @type {Object}
 * @property {String} name
 * @property {String} documentNumber
 * @property {String} documentType
 */

/**
 * @param {CreateEntityDto} data
 */
const create = async data => database.transaction(async (trx) => {
  const [entityId] = await entityModel
    .create(database, data)
    .transacting(trx);

  const entity = await entityModel
    .getById(database, entityId)
    .transacting(trx);

  return entity;
});

exports.create = create;

/**
 * @param {Number} id
 */
const findById = async (id) => {
  const entity = await entityModel.getById(database, id);
  if (!entity) {
    throw new ResourceNotFoundError();
  }
  return entity;
};

exports.findById = findById;
