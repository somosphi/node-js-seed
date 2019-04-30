const Joi = require('joi');

const id = Joi.number().positive();

exports.create = Joi.object({
  body: Joi.object({
    description: Joi.string()
      .max(10000)
      .trim()
      .required(),
    type: Joi.string()
      .allow(['CHECKING_ACCOUNT', 'SAVINGS_ACCOUNT'])
      .required(),
    entities: Joi.array()
      .items(Joi.string())
      .min(1)
      .unique()
      .required(),
  }).required(),
});

exports.get = Joi.object({
  params: Joi.object({
    walletId: id.required(),
  }).required(),
});

exports.getTransactions = Joi.object({
  params: Joi.object({
    walletId: id.required(),
  }).required(),
});

exports.createTransaction = Joi.object({
  params: Joi.object({
    walletId: id.required(),
  }).required(),
  body: Joi.object({
    authorizationCode: Joi.string()
      .uuid({ version: ['uuidv4'] })
      .required(),
    events: Joi.array()
      .min(1)
      .required()
      .items(Joi.object({
        description: Joi.string()
          .min(1)
          .max(10000)
          .trim()
          .required(),
        event: Joi.string()
          .required(),
        value: Joi.number()
          .positive()
          .min(1)
          .max(Number.MAX_SAFE_INTEGER)
          .required(),
      })),
  }).required(),
});

exports.getTransactionById = Joi.object({
  params: Joi.object({
    walletId: id.required(),
    transactionId: id.required(),
  }),
});
