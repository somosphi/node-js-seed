const { entityService } = require('../../container');

/**
 * Cria uma entidade caso ela não exista
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const create = async (req, res, next) => {
  try {
    const entity = await entityService.create(req.body);
    res.send(entity);
  } catch (err) {
    next(err);
  }
};

exports.create = create;

/**
 * Pega os dados da entidade existente
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const findById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const entity = await entityService.findById(id);
    res.send(entity);
  } catch (err) {
    next(err);
  }
};

exports.findById = findById;
