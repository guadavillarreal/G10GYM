const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'gimnasio'
})

connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos: ', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa. ');
});

module.exports = connection;