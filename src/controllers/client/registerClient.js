const knex = require('../../services/connectionSQL');

const registerClient = async (req, res) => {
  const {
    name,
    email,
    cpf,
    phone,
    address,
    complement,
    zip_code: zipCode,
    neighborhood,
    city,
    state
  } = req.body;

  try {
    const emailExists = (await knex('client').where({ email }))[0];

    if (emailExists) {
      return res.status(400).json({ mensagem: "O e-mail já existe cadastrado" });
    }

    const registeredClient = (await knex('client')
      .insert({
        name: name,
        email: email,
        cpf: cpf,
        phone: phone,
        address: address || "Não informado.",
        complement: complement || "Não informado.",
        zip_code: zipCode || "Não informado.",
        neighborhood: neighborhood || "Não informado.",
        city: city || "Não informado.",
        state: state || "Não informado.",
      })
      .returning('*'))[0];

    return res.status(201).json(registeredClient);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = registerClient;
