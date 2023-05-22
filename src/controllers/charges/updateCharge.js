const knex = require('../../services/connectionSQL');

const updateCharge = async (req, res) => {
  const { description, status, value, due_date: dueDate } = req.body;
  const { id } = req.params;

  try {
    const updatedCharge = await knex('charge')
      .where('id', id)
      .update({
        description: description,
        paid_out: status,
        value: value,
        due_date: dueDate
      })
      .returning('*')

    return res.status(200).json(updatedCharge);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }


}

module.exports = updateCharge