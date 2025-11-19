const express = require('express');
const router = express.Router();
const {MostrarRutinas_asignadas, MostrarRutinas_asignada, CrearRutinas_asignada, ActualizarRutinas_asignada, EliminarRutinas_asignada} = require('../controllers/rutinas_asignadas');

router.get('/', MostrarRutinas_asignadas);
router.get('/:id', MostrarRutinas_asignada);
router.post('/', CrearRutinas_asignada);
router.put('/:id', ActualizarRutinas_asignada);
router.delete('/:id', EliminarRutinas_asignada);

module.exports = router;
