const knex = require('../../services/connectionSQL');
const verifyDate = require('../../utils/verifyDate');

const listChargesByStatus = async (req, res) => {

    const paidCharges = [];
    const pendingCharges = [];
    const expiredCharges = [];

    try {
        const chargesList = await knex('charge')
            .rightJoin('client', 'charge.client_id', '=', 'client.id')
            .select('charge.id', 'name', 'description', 'value', 'due_date', 'paid_out')
            .where('charge.id', 'is not', null)
            .returning('*');

        chargesList.map((charge) => {
            if (charge.paid_out === true) {
                paidCharges.push(charge)
            };

            if (charge.paid_out === false) {
                const isAfterToday = verifyDate(charge.due_date);

                if (isAfterToday) {
                    pendingCharges.push(charge)
                };

                if (!isAfterToday) {
                    expiredCharges.push(charge)
                };
            };
        });

        const chargesByStatus = {
            paid: paidCharges,
            pending: pendingCharges,
            expired: expiredCharges
        };

        return res.status(200).json(chargesByStatus);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};


module.exports = listChargesByStatus;
