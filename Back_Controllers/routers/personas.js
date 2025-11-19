const express = require('express');
const router = express.Router();
const {MostrarPersonas, MostrarPersona, CrearPersona, ActualizarPersona, EliminarPersona} = require('../controllers/persona');

router.get('/', MostrarPersonas);
router.get('/:id', MostrarPersona);
router.post('/', CrearPersona);
router.put('/:id', ActualizarPersona);
router.delete('/:id', EliminarPersona);

module.exports = router;