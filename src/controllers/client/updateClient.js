const knex = require('../../services/connectionSQL');

const updateClient = async (req, res) => {
    const { name, email, cpf, phone,
        address, complement,
        zip_code, neighborhood, city, state } = req.body;

    const { id } = req.params;

    const fieldsToUpdate = {
        name,
        email,
        cpf,
        phone
    }

    try {
        const clientExist = await knex('client').where({ id }).first();

        if (!clientExist) {
            return res.status(404).json({ menssagem: "Cliente não encontrado" })
        }

        const emailExist = await knex('client').where({ email }).first();

        if (emailExist && emailExist.email !== clientExist.email) {
            return res.status(400).json({ mensagem: "E-mail já cadastrado" })
        }

        const cpfExist = await knex('client').where({ cpf }).first();

        if (cpfExist && cpfExist.cpf !== clientExist.cpf) {
            return res.status(400).json({ mensagem: "CPF já cadastrado" })
        }

        if (address) {
            fieldsToUpdate.address = address;
        }

        if (complement) {
            fieldsToUpdate.complement = complement;
        }

        if (zip_code) {
            fieldsToUpdate.zip_code = zip_code;
        }

        if (neighborhood) {
            fieldsToUpdate.neighborhood = neighborhood;
        }

        if (city) {
            fieldsToUpdate.city = city;
        }

        if (state) {
            fieldsToUpdate.state = state;
        }

        const updateClient = await knex('client')
            .where({ id })
            .update(fieldsToUpdate)
            .returning('*');

        return res.status(200).json(updateClient[0]);
    } catch (error) {
        return res.status(500).json({ menssagem: "Erro interno do servidor." })
    }
};


module.exports = updateClient;