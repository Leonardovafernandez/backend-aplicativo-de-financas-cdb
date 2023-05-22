const jwt = require('jsonwebtoken');
const knex = require('../services/connectionSQL');
const hash = process.env.JWT_HASH;

const verifyLoggedUser = (async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autoriazado" });
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {

        const { id } = jwt.verify(token, hash);

        const userExist = await knex('users').where({ id }).first();

        if (!userExist) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        const { password, ...user } = userExist;

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
});

module.exports = verifyLoggedUser;