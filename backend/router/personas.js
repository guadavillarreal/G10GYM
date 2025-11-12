const express = require('express')
const router = express.Router()

// importamos los controladores 
const { mostrarPersonas,
    mostrarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona } = require('../controllers/personas');

// definimos rutas para cada controlador 
router.get('/personas', mostrarPersonas);
router.get('/persona/:id', mostrarPersona);
router.post('/persona', crearPersona);
router.put('/persona/:id', editarPersona);
router.delete('/persona/:id', eliminarPersona);

module.exports = router;



