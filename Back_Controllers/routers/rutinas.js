const express = require('express');
const router = express.Router();
const {MostrarRutinas, MostrarRutina, CrearRutina, ActualizarRutina, EliminarRutina} = require('../controllers/rutinas');

router.get('/', MostrarRutinas);
router.get('/:id', MostrarRutina);
router.post('/', CrearRutina);
router.put('/:id', ActualizarRutina);
router.delete('/:id', EliminarRutina);

module.exports = router;
