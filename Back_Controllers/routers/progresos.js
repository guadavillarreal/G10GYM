const express = require('express');
const router = express.Router();
const {MostrarProgresos, MostrarProgreso, CrearProgreso, ActualizarProgreso, EliminarProgreso} = require('../controllers/progresos');

router.get('/', MostrarProgresos);
router.get('/:id', MostrarProgreso);
router.post('/', CrearProgreso);
router.put('/:id', ActualizarProgreso);
router.delete('/:id', EliminarProgreso);

module.exports = router;
