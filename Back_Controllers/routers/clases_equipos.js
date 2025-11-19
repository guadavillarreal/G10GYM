const express = require('express');
const router = express.Router();
const {MostrarClases_equipos, MostrarClases_equipo, CrearClases_equipo, ActualizarClases_equipo, EliminarClases_equipo} = require('../controllers/clases_equipos');

router.get('/', MostrarClases_equipos);
router.get('/:id', MostrarClases_equipo);
router.post('/', CrearClases_equipo);
router.put('/:id', ActualizarClases_equipo);
router.delete('/:id', EliminarClases_equipo);

module.exports = router;
