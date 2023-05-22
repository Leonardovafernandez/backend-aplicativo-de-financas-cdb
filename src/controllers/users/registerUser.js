const knex = require('../../services/connectionSQL');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const userExist = await knex('users').where({ email }).first();
        if (userExist) {
            return res.status(400).json({ mensagem: "Email já cadastrado" })
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await knex('users')
            .insert({
                name: name,
                email: email,
                password: encryptedPassword,
            }).returning('*');

        const { password: _, ...registeredUser } = user[0]

        return res.status(201).json(registeredUser);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
}


module.exports = registerUser;



