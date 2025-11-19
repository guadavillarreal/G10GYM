const express = require('express');
const mysql = require('mysql2');
const connection = require('./configDB/dataBase');

const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());


app.use(express.json());

// Montar dinámicamente todos los routers que estén en la carpeta ./routers
const routersPath = path.join(__dirname, 'routers');
if (fs.existsSync(routersPath)) {
    fs.readdirSync(routersPath).forEach(file => {
        if (file.endsWith('.js')) {
            const route = require(`./routers/${file}`);
            const routePath = `/${file.replace('.js', '')}`;
            app.use(routePath, route);
        }
    });
}

app.get('/', (req, res) => {
    res.send('API de Gestión de Gimnasio')});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000'); 
});
