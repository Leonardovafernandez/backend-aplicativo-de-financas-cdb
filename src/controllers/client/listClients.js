const knex = require('../../services/connectionSQL');

const listClients = async (req, res) => {
    const { search } = req.query
    let clientList = [];

    try {
        if (search && isNaN(search)) {

            if (search.includes('@')) {
                clientList = await knex('client')
                    .whereILike('email', `%${search}%`)
                return res.status(200).json(clientList);
            }

            clientList = await knex('client')
                .whereILike('name', `%${search}%`)

            return res.status(200).json(clientList);
        }

        if (search && typeof Number(search) === 'number') {

            if (search.length !== 11) {
                clientList = await knex('client')
                    .where('id', search)

                return res.status(200).json(clientList);
            }

            clientList = await knex('client')
                .where('cpf', search)

            return res.status(200).json(clientList);
        }

        clientList = await knex('client');

        return res.status(200).json(clientList);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = listClients;