const express = require('express');
const router = express.Router();
const { marcarFavorito, desmarcarFavorito, obtenerFavoritos, recargarPropiedades } = require('../config/db');
const propiedades = require('../config/db').propiedades;

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

  marcarFavorito(req, id); // Se pasa `req` en caso de que se use `req.session.favoritos`
  res.json({ success: true, favoritos: req.session.favoritos });
});

// Ruta para desmarcar una propiedad como favorita
router.delete('/:id', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  desmarcarFavorito(req, id);
  res.json({ success: true, favoritos: req.session.favoritos });
});

// Ruta para obtener las propiedades favoritas del usuario
router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }
  // Obtén las propiedades actualizadas directamente de la base de datos
  const favoritos = await obtenerFavoritos(userId);
  const propiedadesActualizadas = await recargarPropiedades();

  res.render('favoritos', { propiedadesFavoritas: favoritos, todasPropiedades: propiedadesActualizadas});
});

// Ruta para la página de propiedades en alquiler
router.get('/alquilar', async (req, res) => {
  const userId = req.session.userId;
  const favoritos = userId ? await obtenerFavoritos(userId) : [];
  res.render('alquilar', { propiedades, favoritos });
});

// Ruta para la página de propiedades en compra
router.get('/comprar', async (req, res) => {
  const userId = req.session.userId;
  const favoritos = userId ? await obtenerFavoritos(userId) : [];
  res.render('comprar', { propiedades, favoritos });
});

module.exports = router;
