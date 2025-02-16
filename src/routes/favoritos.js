const express = require('express');
const router = express.Router();
const { marcarFavorito, desmarcarFavorito, obtenerFavoritos } = require('../controllers/db');
const db = require('../controllers/db'); // Asegúrate de usar la misma referencia
const propiedades = db.propiedades;

// Ruta para marcar una propiedad como favorita
router.post('/:id', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  marcarFavorito(userId, id);

  res.json({ success: true, message: `Propiedad con ID ${id} marcada como favorita.` });
});

router.delete('/:id', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }

  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  desmarcarFavorito(userId, id);

  res.json({ success: true, message: `Propiedad con ID ${id} removida de favoritos.` });
});


// Ruta para obtener las propiedades favoritas del usuario
router.get('/', async (req, res) => {
  const userId = req.session.userId; // Obtener el ID del usuario logueado
  if (!userId) {
    return res.redirect('/login'); // Redirigir si no hay usuario autenticado
  }

  const favoritos = await obtenerFavoritos(userId); // Obtener favoritos desde la base de datos
  res.render('favoritos', { propiedadesFavoritas: favoritos, todasPropiedades: propiedades });
});

// Ruta para la página de propiedades en alquiler
router.get('/alquilar', async (req, res) => {
  const userId = req.session.userId;
  const favoritos = userId ? await obtenerFavoritos(userId) : []; // Si hay usuario, obtener favoritos
  res.render('alquilar', { propiedades, favoritos });
});

// Ruta para la página de propiedades en compra
router.get('/comprar', async (req, res) => {
  const userId = req.session.userId;
  const favoritos = userId ? await obtenerFavoritos(userId) : []; // Si hay usuario, obtener favoritos
  res.render('comprar', { propiedades, favoritos });
});

module.exports = router;
