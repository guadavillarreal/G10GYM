const express = require('express');
const router = express.Router();
const {MostrarDietas, MostrarDieta, CrearDieta, ActualizarDieta, EliminarDieta} = require('../controllers/dietas');

router.get('/', MostrarDietas);
router.get('/:id', MostrarDieta);
router.post('/', CrearDieta);
router.put('/:id', ActualizarDieta);
router.delete('/:id', EliminarDieta);

module.exports = router;
