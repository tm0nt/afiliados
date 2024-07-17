const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '195.35.43.106',
    user: 'afiliados',
    password: 'X5beGKsKc0PbtT6lrCzs',
    database: 'cactus'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL');
    }
});

module.exports = db;
