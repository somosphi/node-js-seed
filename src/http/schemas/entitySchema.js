const Joi = require('@hapi/joi');

exports.create = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .uppercase()
      .required(),
    documentNumber: Joi.string().required(),
    documentType: Joi.string()
      .allow('CPF', 'CNPJ')
      .required(),
  }).required(),
});

exports.findById = Joi.object({
  params: Joi.object({
    id: Joi.number().positive().required(),
  }),
});
