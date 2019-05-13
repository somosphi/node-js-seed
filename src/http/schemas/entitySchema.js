const Joi = require('joi');

exports.create = Joi.object({
  body: Joi.object({
    name: Joi.string()
      .trim()
      .uppercase()
      .required(),
    email: Joi.string().email().lowercase().trim()
      .required(),
  }).required(),
});

exports.findById = Joi.object({
  params: Joi.object({
    id: Joi.number().positive().required(),
  }),
});

exports.getAll = Joi.object();
