const joi = require('joi')

const updateChargeSchema = joi.object({
  description: joi.string().required().messages({
    'any.required': 'O campo descrição é obrigatório.',
    'string.empty': 'O campo descrição é obrigatório.'
  }),
  due_date: joi.string().required().messages({
    'any.required': 'O campo data é obrigatório.',
    'string.empty': 'O campo data é obrigatório.'
  }),
  value: joi.string().required().messages({
    'any.required': 'O campo valor é obrigatório.',
    'string.empty': 'O campo valor é obrigatório.'
  }),
  status: joi.boolean()
})

module.exports = updateChargeSchema