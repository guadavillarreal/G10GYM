const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'gimnasio'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida exitosamente.');
});

module.exports = connection;