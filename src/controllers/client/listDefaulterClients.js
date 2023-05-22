const knex = require('../../services/connectionSQL');

const listDefaulterClients = async (req, res) => {
  const clientsDefaulter = []
  try {
    const clientList = await knex('client');

    clientList.map(client => {
      if (client.defaulter === true) {
        return clientsDefaulter.push(client)
      }
    })

    return res.status(200).json(clientsDefaulter);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = listDefaulterClients;