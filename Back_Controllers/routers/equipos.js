const express = require('express');
const router = express.Router();
const {MostrarEquipos, MostrarEquipo, CrearEquipo, ActualizarEquipo, EliminarEquipo} = require('../controllers/equipos');

router.get('/', MostrarEquipos);
router.get('/:id', MostrarEquipo);
router.post('/', CrearEquipo);
router.put('/:id', ActualizarEquipo);
router.delete('/:id', EliminarEquipo);

module.exports = router;
