const express = require('express');
const router = express.Router();
const {MostrarReservas, MostrarReserva, CrearReserva, ActualizarReserva, EliminarReserva} = require('../controllers/reservas');

router.get('/', MostrarReservas);
router.get('/:id', MostrarReserva);
router.post('/', CrearReserva);
router.put('/:id', ActualizarReserva);
router.delete('/:id', EliminarReserva);

module.exports = router;
