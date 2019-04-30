

class EntityService {
  /**
   * @param {import('../index').ServiceContext} container
   */
  constructor(container) {
    this.entityModel = container.entityModel;
  }

  /**
   * Cria uma entidate cano não exista e retorna id
   * @param {import('../models/EntityModel').CreateEntity} data
   * @returns {String} entityId
   */
  async create(data) {
    const entity = await this.entityModel.get(data);

    if (!entity) {
      const [entityId] = await this.entityModel.create(data);
      return entityId;
    }

    return entity.id;
  }

  /**
   * Retorna uma entidade
   * @param {import('../models/EntityModel').Entity} where
   * @returns {import('../models/EntityModel').Entity}
   */
  async get(where) {
    return this.entityModel.get(where);
  }
}

module.exports = EntityService;
