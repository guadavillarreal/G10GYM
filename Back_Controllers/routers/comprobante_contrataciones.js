const express = require('express');
const router = express.Router();
const {MostrarComprobante_contrataciones, MostrarComprobante_contratacione, CrearComprobante_contratacione, ActualizarComprobante_contratacione, EliminarComprobante_contratacione} = require('../controllers/comprobante_contrataciones');

router.get('/', MostrarComprobante_contrataciones);
router.get('/:id', MostrarComprobante_contratacione);
router.post('/', CrearComprobante_contratacione);
router.put('/:id', ActualizarComprobante_contratacione);
router.delete('/:id', EliminarComprobante_contratacione);

module.exports = router;
