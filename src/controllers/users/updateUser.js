const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const { name, email, password, cpf, phone } = req.body;
  const userId = req.user.id;
  const toUpdate = { name, email };

  try {
    const userExist = await knex('users').where({ email });

    if (userExist.length > 1) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" })
    }

    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      toUpdate.password = encryptedPassword;
    }

    if (cpf) {
      toUpdate.cpf = cpf
    }

    if (phone) {
      toUpdate.phone = phone
    }

    const updatedUser = await knex('users')
      .where('id', userId)
      .update(toUpdate)
      .returning('*')

    return res.status(200).json(updatedUser[0]);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

module.exports = updateUser;