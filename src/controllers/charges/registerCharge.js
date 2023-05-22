const knex = require('../../services/connectionSQL');
const isDateAfterOrToday = require('../../utils/verifyDate');

const registerCharge = async (req, res) => {
    const { description, due_date: dueDate, value, status } = req.body;
    const { id } = req.params;

    try {
        const clientExist = await knex('client').where({ id }).returning(['name']);

        const chargeExpired = isDateAfterOrToday(dueDate);

        if (!chargeExpired && !status) {
            await knex('client')
                .where({ id })
                .update({ defaulter: true })
                .returning('*');
        }

        const userCharge = await knex('charge')
            .insert({
                client_id: id,
                value,
                due_date: dueDate,
                description,
                paid_out: status
            }).returning('*');

        const charge = { ...userCharge[0], name: clientExist[0].name };

        return res.status(201).json(charge);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


module.exports = registerCharge;
