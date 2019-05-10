const Joi = require('../../helpers/Joi');

const id = Joi.number().positive();

exports.create = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .uppercase()
      .required(),
    documentNumber: Joi.document()
      .required(),
    documentType: Joi.string()
      .allow('CPF', 'CNPJ')
      .required(),
  }).required(),
});

exports.get = Joi.object({
  params: Joi.object({
    entityId: id.required(),
  }),
});
