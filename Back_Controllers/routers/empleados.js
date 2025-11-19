const express = require('express');
const router = express.Router();
const {MostrarEmpleados, MostrarEmpleado, CrearEmpleado, ActualizarEmpleado, EliminarEmpleado} = require('../controllers/empleados');

router.get('/', MostrarEmpleados);
router.get('/:id', MostrarEmpleado);
router.post('/', CrearEmpleado);
router.put('/:id', ActualizarEmpleado);
router.delete('/:id', EliminarEmpleado);

module.exports = router;
