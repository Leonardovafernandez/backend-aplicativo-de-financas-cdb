const knex = require('../../services/connectionSQL');
const addStatusOnCharges = require('../../utils/addStatusOnCharges');

const listPaidCharges = async (req, res) => {

  const paidCharges = [];

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
    });

    return res.status(200).json(addStatusOnCharges(paidCharges));
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listPaidCharges;
