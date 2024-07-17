const express = require('express');
const app = express();
const port = 5555;
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
