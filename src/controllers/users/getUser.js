const knex = require('../../services/connectionSQL')

const getLoggedUser = async (req, res) => {
  const userId = req.user.id

  const user = await knex('users').where('id', userId).first()

  const { password: _, ...userInfos } = user
  return res.json(userInfos)
}

module.exports = getLoggedUser