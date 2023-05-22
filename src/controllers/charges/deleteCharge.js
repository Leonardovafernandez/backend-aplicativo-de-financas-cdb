const knex = require('../../services/connectionSQL');

const deleteCharge = async (req, res) => {
  const { id } = req.params

  try {

    await knex('charge')
      .where('id', id)
      .del()

    return res.json({ mensagem: "Cobrança apagada com sucesso" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }

}

module.exports = deleteCharge;