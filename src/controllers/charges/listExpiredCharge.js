const knex = require('../../services/connectionSQL');
const addStatusOnCharges = require('../../utils/addStatusOnCharges');
const verifyDate = require('../../utils/verifyDate');

const listExpiredCharges = async (req, res) => {

  const expiredCharges = [];

  try {
    const chargesList = await knex('charge')
      .rightJoin('client', 'charge.client_id', '=', 'client.id')
      .select('charge.id', 'name', 'description', 'value', 'due_date', 'paid_out')
      .where('charge.id', 'is not', null)
      .returning('*');

    chargesList.map((charge) => {
      const isAfterToday = verifyDate(charge.due_date);

      if (charge.paid_out === false && !isAfterToday) {
        expiredCharges.push(charge)
      };
    });

    return res.status(200).json(addStatusOnCharges(expiredCharges));
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};


module.exports = listExpiredCharges;
