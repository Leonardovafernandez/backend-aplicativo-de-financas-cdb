const joi = require('joi');

const emailValidationSchema = joi.object({

    email: joi.string().email().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.'
    })
})

module.exports = emailValidationSchema;
