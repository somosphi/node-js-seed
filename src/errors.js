class CodedError extends Error {
  constructor(code, message = null) {
    super(message || code);
    this.code = code;
  }
  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}

class DetailedCodedError extends CodedError {
  constructor(code, message, details) {
    super(code, message);
    this.details = details;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}

class NotFoundError extends CodedError {
  constructor(message) {
    super('NOT_FOUND', message);
  }
}

class ResourceNotFoundError extends CodedError {
  constructor(message) {
    super('RESOURCE_NOT_FOUND', message);
  }
}

class ResourceDuplicatedError extends CodedError {
  constructor(message) {
    super('RESOURCE_DUPLICATED', message);
  }
}

class ValidationError extends DetailedCodedError {
  constructor(message, details) {
    super('VALIDATION_FAILED', message, details);
  }
}

class UnavailableServiceError extends DetailedCodedError {
  constructor(message, details) {
    super('UNAVAILABLE_SERVICE', message, details);
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  ResourceNotFoundError,
  UnavailableServiceError,
  ResourceDuplicatedError,
};
