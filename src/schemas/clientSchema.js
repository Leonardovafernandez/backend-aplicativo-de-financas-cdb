const joi = require('joi');

const clientSchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'Este campo deve ser preenchido',
    'string.empty': 'Este campo deve ser preenchido'
  }),
  email: joi.string().regex(/^\S+$/).email().required().messages({
    'any.required': 'Este campo deve ser preenchido.',
    'string.empty': 'Este campo deve ser preenchido.',
    'string.email': 'O campo e-mail precisa ter um formato válido.',
    'string.pattern.base': 'O campo email precisa ter um formato válido.'
  }),
  cpf: joi.string().required().regex(/^\S+$/).min(11).max(11).messages({
    'any.required': 'O campo cpf é obrigatório',
    'string.empty': 'O campo cpf é obrigatório',
    'string.pattern.base': 'O campo cpf precisa ter um formato válido',
    'string.min': 'O campo cpf precisa conter um formato válido',
    'string.max': 'O campo cpf precisa conter um formato válido'
  }),
  phone: joi.string().required().messages({
    'any.required': 'Este campo deve ser preenchido',
    'string.empty': 'Este campo deve ser preenchido'
  }),
  defaulter: joi.boolean().messages({
    "boolean.base": "O valor não é um boolean"
  }),
  address: joi.string().allow(null, ''),
  complement: joi.string().allow(null, ''),
  zip_code: joi.string().allow(null, ''),
  neighborhood: joi.string().allow(null, ''),
  city: joi.string().allow(null, ''),
  state: joi.string().allow(null, ''),
});

module.exports = clientSchema;
