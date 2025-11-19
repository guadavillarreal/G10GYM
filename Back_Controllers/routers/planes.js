const express = require('express');
const router = express.Router();
const {MostrarPlanes, MostrarPlane, CrearPlane, ActualizarPlane, EliminarPlane} = require('../controllers/planes');

router.get('/', MostrarPlanes);
router.get('/:id', MostrarPlane);
router.post('/', CrearPlane);
router.put('/:id', ActualizarPlane);
router.delete('/:id', EliminarPlane);

module.exports = router;
