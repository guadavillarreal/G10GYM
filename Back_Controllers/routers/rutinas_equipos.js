const express = require('express');
const router = express.Router();
const {MostrarRutinas_equipos, MostrarRutinas_equipo, CrearRutinas_equipo, ActualizarRutinas_equipo, EliminarRutinas_equipo} = require('../controllers/rutinas_equipos');

router.get('/', MostrarRutinas_equipos);
router.get('/:id', MostrarRutinas_equipo);
router.post('/', CrearRutinas_equipo);
router.put('/:id', ActualizarRutinas_equipo);
router.delete('/:id', EliminarRutinas_equipo);

module.exports = router;
