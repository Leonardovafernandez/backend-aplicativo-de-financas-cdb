const joi = require('joi');

const registerChargeSchema = joi.object({
    description: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo deve ser preenchido'
    }),
    due_date: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido'
    }),
    value: joi.string().required().messages({
        'any.required': 'Este campo deve ser preenchido',
        'string.empty': 'Este campo deve ser preenchido'
    }),
    status: joi.boolean().required()
})


module.exports = registerChargeSchema;

