const knex = require('../../services/connectionSQL');
const verifyDate = require('../../utils/verifyDate');

const listTotalChargesValues = async (req, res) => {

  let paid = 0;
  let expired = 0;
  let pending = 0;

  try {
    const chargesList = await knex('charge')
      .select('value', 'due_date', 'paid_out')
      .returning('*');

    chargesList.map((charge) => {
      if (charge.paid_out === true) {
        paid += Number(charge.value)
      };

      if (charge.paid_out === false) {
        const isAfterToday = verifyDate(charge.due_date);

        if (isAfterToday) {
          pending += Number(charge.value);
        };

        if (!isAfterToday) {
          expired += Number(charge.value);
        };
      };
    });

    const totalChargesValues = {
      paid: paid.toString(),
      expired: expired.toString(),
      pending: pending.toString(),
    }

    return res.status(200).json(totalChargesValues);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listTotalChargesValues;
