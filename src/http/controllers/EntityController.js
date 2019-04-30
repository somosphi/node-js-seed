const {
  ResourceNotFoundError,
  ResourceDuplicatedError,
} = require('../../errors');

/**
 * @param {import('../../container').Container} container
 */
class EntityController {
  constructor(container) {
    this.entityService = container.entityService;
  }

  /**
   * Cria uma entidade caso ela não exista
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { body } = req;
      const entityId = await this.entityService.create(body);
      const entity = await this.entityService.get({ id: entityId });

      res.send(entity);
    } catch (err) {
      if (err instanceof ResourceDuplicatedError) {
        err.message = req.__('error.resourceDuplicatedError');
      }
      next(err);
    }
  }

  /**
   * Pega os dados da entidade existente
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async get(req, res, next) {
    try {
      const { params } = req;
      const entity = await this.entityService.get({ id: params.entityId });

      res.send(entity);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) {
        err.message = req.__('error.resourceNotFoundError');
      }
      next(err);
    }
  }
}

module.exports = EntityController;
