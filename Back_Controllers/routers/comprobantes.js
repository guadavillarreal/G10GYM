const express = require('express');
const router = express.Router();
const {MostrarComprobantes, MostrarComprobante, CrearComprobante, ActualizarComprobante, EliminarComprobante} = require('../controllers/comprobantes');

router.get('/', MostrarComprobantes);
router.get('/:id', MostrarComprobante);
router.post('/', CrearComprobante);
router.put('/:id', ActualizarComprobante);
router.delete('/:id', EliminarComprobante);

module.exports = router;
