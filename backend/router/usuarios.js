const express = require('express');
const router = express.Router();

// importamos los controladores
const { mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    login } = require('../controllers/usuarios');

// definimos rutas para cada controlador
    router.get('/usuarios', mostrarUsuarios);
    router.get('/usuario/:id', mostrarUsuario);
    router.post('/usuario', crearUsuario);
    router.put('/usuario/:id', editarUsuario);
    router.delete('/usuario/:id', eliminarUsuario),
    
    router.post('/login', login);



module.exports = router;