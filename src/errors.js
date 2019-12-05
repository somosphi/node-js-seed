const {
  BadRequest,
  InternalServerError,
  NotFound,
  NotImplemented,
  Unauthorized,
  UnprocessableEntity,
  CustomError,
} = require('@4alltecnologia/http-errors');

class Conflict extends CustomError {
  constructor(message, details) {
    super('CONFLICT', message, details);
  }
}

module.exports = {
  BadRequest,
  InternalServerError,
  NotFound,
  NotImplemented,
  Unauthorized,
  UnprocessableEntity,
  CustomError,
  Conflict
}
