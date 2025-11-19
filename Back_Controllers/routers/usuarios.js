const express = require('express');
const router = express.Router();
const {MostrarUsuarios, MostrarUsuario, CrearUsuario, ActualizarUsuario, EliminarUsuario} = require('../controllers/usuarios');

router.get('/', MostrarUsuarios);
router.get('/:id', MostrarUsuario);
router.post('/', CrearUsuario);
router.put('/:id', ActualizarUsuario);
router.delete('/:id', EliminarUsuario);

module.exports = router;
