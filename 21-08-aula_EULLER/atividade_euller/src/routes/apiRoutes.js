
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Rota POST para cadastrar professor
router.post('/teacher/', teacherController.postTeacher);

// Rota GET para listar professor
router.get('/teacher/', teacherController.getTeacher);

module.exports = router;
