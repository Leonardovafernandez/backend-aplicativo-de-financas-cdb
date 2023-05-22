const knex = require('../../services/connectionSQL');

const listInDayClients = async (req, res) => {
  const clientsInDay = []

  try {
    const clientList = await knex('client');

    clientList.map(client => {
      if (client.defaulter === false) {
        return clientsInDay.push(client)
      }
    })

    return res.status(200).json(clientsInDay);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = listInDayClients;