const {
  CustomError,
  NotFound,
  Unauthorized,
  BadRequest,
  InternalServerError,
  Conflict,
} = require('../../errors');
const { logger } = require('../../logger');

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  let status = 500;
  let throwErr = err;

  if (throwErr instanceof BadRequest) {
    status = 400;
  }

  if (throwErr instanceof Unauthorized) {
    status = 401;
  }

  if (err instanceof NotFound) {
    status = 404;
  }

  if (err.code && err.code === 'ER_DUP_ENTRY') {
    status = 409;
    throwErr = new Conflict('Already exists resource with received unique keys');
  }

  if (!(throwErr instanceof CustomError)) {
    throwErr = new InternalServerError(throwErr.message);
  }

  if (status !== 500) {
    logger.warn(err);
  } else {
    logger.error(err);
  }

  return res
    .status(status)
    .send(throwErr.toJSON());
};

module.exports = errorHandlerMiddleware;
