const express = require('express');
const router = express.Router();
const { marcarFavorito, desmarcarFavorito, obtenerFavoritos } = require('../controllers/db');
const db = require('../controllers/db'); // Asegúrate de usar la misma referencia
const propiedades = db.propiedades;

// Ruta para marcar una propiedad como favorita
router.post('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  marcarFavorito(id);
  res.json({ success: true, message: `Propiedad con ID ${id} marcada como favorita.` });
});

// Ruta para desmarcar una propiedad como favorita
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  desmarcarFavorito(id);
  res.json({ success: true, message: `Propiedad con ID ${id} removida de favoritos.` });
});

// Ruta para obtener las propiedades favoritas
router.get('/', (req, res) => {
  const favoritos = req.session.favoritos || []; // Asegúrate de que la sesión tenga favoritos
  // Usar obtenerFavoritos con favoritos de la sesión
  const propiedadesFavoritas = obtenerFavoritos(favoritos); // Cambié esto para pasar los favoritos de la sesión
  res.render('favoritos', { propiedadesFavoritas });
});


// Ruta para la página de propiedades en alquiler
router.get('/alquilar', (req, res) => {
  const favoritos = req.session.favoritos || []; // Obtén los favoritos de la sesión
  res.render('alquilar', { propiedades, favoritos });
});
// Ruta para la página de propiedades en alquiler
router.get('/comprar', (req, res) => {
  const favoritos = req.session.favoritos || []; // Obtén los favoritos de la sesión
  res.render('comprar', { propiedades, favoritos });
});

module.exports = router;
