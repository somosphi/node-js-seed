class CodedError extends Error {
  /**
   * @param {String} code
   */
  constructor(code) {
    super();
    this.code = code;
  }

  /**
   * @param {String} message
   */
  setMessage(message) {
    this.message = message;
    return this;
  }

  toJSON() {
    return {
      message: this.message || null,
      code: this.code || null,
    };
  }
}

class DetailedCodedError extends CodedError {
  /**
   * @param {*} details
   */
  setDetails(details) {
    this.details = details;
    return this;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details || null,
    };
  }
}

class NotFoundError extends CodedError {
  constructor() {
    super('NOT_FOUND');
  }
}

class ResourceNotFoundError extends CodedError {
  constructor() {
    super('RESOURCE_NOT_FOUND');
  }
}

class ResourceDuplicatedError extends CodedError {
  constructor() {
    super('RESOURCE_DUPLICATED');
  }
}

class ValidationError extends DetailedCodedError {
  constructor(details) {
    super('VALIDATION_FAILED');
    this.setDetails(details);
  }
}

module.exports = {
  CodedError,
  DetailedCodedError,
  NotFoundError,
  ResourceNotFoundError,
  ResourceDuplicatedError,
  ValidationError,
};
