const express = require('express');
const mysql = require('mysql2');
const personasRouter = require('./router/personas');
const usuariosRouter = require('./router/usuarios');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', personasRouter);
app.use('/', usuariosRouter);

app.get('/', (req,res) => {
    res.send('Bienvenido a la API de Gym Manager');
})

app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000');
});
