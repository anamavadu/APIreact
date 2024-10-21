const express = require('express');
const router = express.Router();
const salariosController = require('../controllers/salariosController');

// Nuevas nóminas
router.post('/salarios/nuevo', salariosController.nuevoSalario);

// Muestra todas las nóminas
router.get('/salarios', salariosController.mostrarSalarios);

// Muestra una nómina por su ID
router.get('/salarios/:idSalario', salariosController.mostrarSalario);

// Actualiza una nómina por su ID
router.put('/salarios/:idSalario', salariosController.actualizarSalario);

// Elimina una nómina
router.delete('/salarios/:idSalario', salariosController.eliminarSalario);

// Muestra todos los salarios del usuario (gestor) por su ID
router.get('/salarios/gestor/:idGestor', salariosController.mostrarSalariosGestor);

module.exports = router;