const BaseJoi = require('@hapi/joi');
const cpf = require('@fnando/cpf');
const cnpj = require('@fnando/cnpj');

const validateDocument = joi => ({
  name: 'document',
  base: joi.string()
    .min(11)
    .max(14),
  language: {
    cpf: 'document CPF is invalid',
    cnpj: 'document CNPJ is invalid',
    length: 'document size is invalid',
  },
  rules: [
    {
      name: 'format',
      validate(params, value, state, options) {
        if (value.length === 11) {
          if (cpf.isValid(value, true) === false) {
            return this.createError('document.cpf', {}, state, options);
          }

          return value;
        }

        if (value.length === 14) {
          if (cnpj.isValid(value, true) === false) {
            return this.createError('document.cnpj', {}, state, options);
          }

          return value;
        }

        return this.createError('document.length', {}, state, options);
      },
    },
  ],
});

const Joi = BaseJoi.extend(validateDocument);

module.exports = Joi;
