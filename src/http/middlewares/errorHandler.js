const {
  CodedError,
  NotFoundError,
  ResourceNotFoundError,
  ValidationError,
} = require('../../errors');

const logger = require('../../logger');

/**
 * @typedef ErrorConfig
 * @type {Object}
 * @property {typeof CodedError} class
 * @property {String} i18n
 */

/**
 * @type {ErrorConfig[]}
 */
const errorsConfigs = [
  { class: NotFoundError, i18n: 'error.notFound' },
  { class: ResourceNotFoundError, i18n: 'error.resourceNotFound' },
  { class: ValidationError, i18n: 'error.validation' },
];

/**
 * @param {Error} error
 */
const getErrorConfig = error => errorsConfigs
  .find(errorConfig => error instanceof errorConfig.class);

/**
 * @param {import('express').Request} req
 * @param {CodedError} error
 */
const loadErrorMessage = (req, error) => {
  const errorConfig = getErrorConfig(error);
  if (errorConfig) {
    error.setMessage(req.__(errorConfig.i18n));
  }
};

/**
 * @param {*} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof CodedError) {
    loadErrorMessage(req, err);
    logger.warn(err);
  } else {
    logger.error(err);
  }

  if (err instanceof NotFoundError || err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return next();
  }

  if (err instanceof ValidationError) {
    res.status(400).send(err);
    return next();
  }

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    res.status(409).send({
      code: 'DUPLICATED_RESOURCE',
      message: res.__('error.duplicatedResource'),
    });
    return next();
  }

  res.status(500).send({
    code: 'UNEXPECTED_ERROR',
    message: res.__('error.unexpected'),
  });

  return next();
};

module.exports = errorHandler;
