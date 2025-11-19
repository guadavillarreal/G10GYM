const express = require('express');
const router = express.Router();
const {MostrarClases, MostrarClase, CrearClase, ActualizarClase, EliminarClase} = require('../controllers/clases');

router.get('/', MostrarClases);
router.get('/:id', MostrarClase);
router.post('/', CrearClase);
router.put('/:id', ActualizarClase);
router.delete('/:id', EliminarClase);

module.exports = router;
