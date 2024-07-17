const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const login = (req, res) => {
    const { email, password } = req.body;

    userModel.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao comparar as senhas' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            res.json({ message: 'Login realizado com sucesso' });
        });
    });
};

module.exports = {
    login
};
