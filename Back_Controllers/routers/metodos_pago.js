const express = require('express');
const router = express.Router();
const {MostrarMetodosPago, MostrarMetodosPagoById, CrearMetodosPago, ActualizarMetodosPago, EliminarMetodosPago} = require('../controllers/metodos_pago');

router.get('/', MostrarMetodosPago);
router.get('/:id', MostrarMetodosPagoById);
router.post('/', CrearMetodosPago);
router.put('/:id', ActualizarMetodosPago);
router.delete('/:id', EliminarMetodosPago);

module.exports = router;
