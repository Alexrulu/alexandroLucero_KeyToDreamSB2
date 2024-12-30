const express = require('express');
const router = express.Router();

// Ruta para el home
router.get('/', (req, res) => {
    res.render('index'); // Renderiza 'views/index.html'
});

module.exports = router;
