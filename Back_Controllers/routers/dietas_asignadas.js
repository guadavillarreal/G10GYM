const express = require('express');
const router = express.Router();
const {MostrarDietas_asignadas, MostrarDietas_asignada, CrearDietas_asignada, ActualizarDietas_asignada, EliminarDietas_asignada} = require('../controllers/dietas_asignadas');

router.get('/', MostrarDietas_asignadas);
router.get('/:id', MostrarDietas_asignada);
router.post('/', CrearDietas_asignada);
router.put('/:id', ActualizarDietas_asignada);
router.delete('/:id', EliminarDietas_asignada);

module.exports = router;
