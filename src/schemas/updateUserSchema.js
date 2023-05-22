const joi = require('joi')

const updateUserSchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório.',
    'string.empty': 'O campo nome é obrigatório.'
  }),
  email: joi.string().email().required().messages({
    'any.required': 'O campo email é obrigatório.',
    'string.email': 'O campo email precisa ter um formato válido.'
  }),
  password: joi.string().allow(null, ''),
  phone: joi.string().allow(null, ''),
  cpf: joi.string().allow(null, '')
})

module.exports = updateUserSchema
