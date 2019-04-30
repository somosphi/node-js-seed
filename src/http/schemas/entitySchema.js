const Joi = require('joi');

const id = Joi.number().positive();

exports.create = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .uppercase()
      .required(),
    documentNumber: Joi.string()
      .min(11)
      .max(14)
      .regex(/^\d+$/)
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
