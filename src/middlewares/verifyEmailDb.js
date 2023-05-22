const knex = require('../services/connectionSQL');


const verifyEmailDb = async (req, res, next) => {
    const { email } = req.body;

    const emailExist = await knex('users').where({ email }).first().returning('*')

    if (emailExist) {
        return res.status(400).json({ mensagem: "Email já cadastrado" })
    }

    next()
};

module.exports = verifyEmailDb;