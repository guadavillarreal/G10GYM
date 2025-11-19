const express = require('express');
const router = express.Router();
const {MostrarSocios, MostrarSocio, CrearSocio, ActualizarSocio, EliminarSocio} = require('../controllers/socios');

router.get('/', MostrarSocios);
router.get('/:id', MostrarSocio);
router.post('/', CrearSocio);
router.put('/:id', ActualizarSocio);
router.delete('/:id', EliminarSocio);

module.exports = router;
