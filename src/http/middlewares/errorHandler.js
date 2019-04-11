const {
  NotFoundError,
  ResourceNotFoundError,
  InvalidBarcodeError,
  InvalidTransactionIdError,
  ValidationError,
  BillPaymentAlreadyPaidError,
  BillPaymentCanNotBePaidError,
  PaymentSlipExpiredError,
  UnavailableServiceError,
  InvalidAgreementError,
} = require('../../errors');

const logger = require('../../logger');

module.exports = (err, req, res, next) => {
  if (err instanceof BillPaymentAlreadyPaidError || err instanceof BillPaymentCanNotBePaidError) {
    res.status(409).send(err);
    return;
  }

  if (err instanceof NotFoundError || err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return;
  }

  if (
    err instanceof PaymentSlipExpiredError ||
    err instanceof InvalidBarcodeError ||
    err instanceof InvalidTransactionIdError ||
    err instanceof UnavailableServiceError ||
    err instanceof ValidationError ||
    err instanceof InvalidAgreementError
  ) {
    res.status(400).send(err);
    return;
  }

  if (err.code === 'ER_DUP_ENTRY') {
    res
      .status(409)
      .send({ code: 'DUPLICATED_RESOURCE', message: res.__('error.duplicatedResource') });
  } else {
    res.status(500).send({ code: 'UNEXPECTED_ERROR', message: res.__('error.unexpected') });
  }

  logger.error(err);

  next();
};
