const express = require('express');
const router = express.Router();
const {MostrarContrataciones, MostrarContratacione, CrearContratacione, ActualizarContratacione, EliminarContratacione} = require('../controllers/contrataciones');

router.get('/', MostrarContrataciones);
router.get('/:id', MostrarContratacione);
router.post('/', CrearContratacione);
router.put('/:id', ActualizarContratacione);
router.delete('/:id', EliminarContratacione);

module.exports = router;
