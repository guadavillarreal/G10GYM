const express = require('express');
const router = express.Router();
const {MostrarMantenimientos, MostrarMantenimiento, CrearMantenimiento, ActualizarMantenimiento, EliminarMantenimiento} = require('../controllers/mantenimientos');

router.get('/', MostrarMantenimientos);
router.get('/:id', MostrarMantenimiento);
router.post('/', CrearMantenimiento);
router.put('/:id', ActualizarMantenimiento);
router.delete('/:id', EliminarMantenimiento);

module.exports = router;
