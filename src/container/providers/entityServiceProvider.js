const { entityModel } = require('../models');
const { ResourceNotFoundError } = require('../../errors');
const { placeholderIntegration } = require('../integrations');

/**
 * @param {import('../index').ContainerContext} context
 */
const entityServiceProvider = ({ database }) => {
  /**
   * @typedef WriteEntityDto
   * @type {Object}
   * @property {String} name
   * @property {String} email
   */

  /**
   * @param {WriteEntityDto} data
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

  /**
   * @param {WriteEntityDto} data
   */
  const createOrUpdate = async (trx, data) => {
    let entity = await entityModel
      .getByEmail(database, data.email)
      .transacting(trx);

    let entityId = entity && entity.id;
    if (!entityId) {
      const [createdEntityId] = await entityModel
        .create(database, data)
        .transacting(trx);
      entityId = createdEntityId;
    } else {
      await entityModel
        .update(database, {
          ...entity,
          ...data,
        })
        .transacting(trx);
    }

    entity = await entityModel.getById(database, entityId).transacting(trx);

    return entity;
  };

  /**
   * @typedef PlaceholderFetchResult
   * @type {Object}
   * @property {Number} writedCount
   */

  /**
   * @return {Promise<PlaceholderFetchResult>}
   */
  const fetchFromPlaceholderApi = async () => {
    const placeholderUsers = await placeholderIntegration.getUsers();

    const writedEntities = await database.transaction(async trx => Promise.all(
      placeholderUsers.map(placeholderUser => createOrUpdate(trx, {
        name: placeholderUser.name,
        email: placeholderUser.email,
      })),
    ));

    return { writedCount: writedEntities.length };
  };

  const getAll = async () => {
    const entities = await entityModel.getAll(database);
    return entities;
  };

  return {
    create, findById, fetchFromPlaceholderApi, getAll,
  };
};

module.exports = entityServiceProvider;
