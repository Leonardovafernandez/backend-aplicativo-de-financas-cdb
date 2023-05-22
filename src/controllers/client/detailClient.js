const knex = require('../../services/connectionSQL');

const detailClient = async (req, res) => {
    const { id } = req.params;

    try {
        const clientExist = await knex('client').where({ id }).first();

        if (!clientExist) {
            return res.status(404).json({ menssagem: "Cliente não encontrado." })
        }

        return res.status(200).json(clientExist);
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor." })
    }


}

module.exports = detailClient;