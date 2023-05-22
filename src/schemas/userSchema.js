const joi = require('joi');

const userSchema = joi.object({
    name: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome é obrigatório.'
    }),
    email: joi.string().regex(/^\S+$/).email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.email': 'O campo email precisa ter um formato válido.',
        'string.pattern.base': 'O campo email precisa ter um formato válido.'
    }),
    password: joi.string().required().min(6).messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha é obrigatório.',
        'string.min': 'A senha precisa conter no mínimo 6 caracteres.'
    }),
})

module.exports = userSchema;
