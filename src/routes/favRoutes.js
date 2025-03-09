const express = require('express');
const router = express.Router();
const db = require('../database/config/db'); // Conexión a MySQL
const functions = require('../services/functions');
const propiedades_type = functions.propiedades_type;

// Función para obtener los favoritos desde la base de datos
async function obtenerFavoritos(userId) {
  try {
    const [rows] = await db.query('SELECT favoritos FROM users WHERE id = ?', [userId]);
    if (rows.length === 0 || !rows[0].favoritos) return [];
    return rows[0].favoritos; // Retornamos directamente el array almacenado en la base de datos
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    return [];
  }
}


// Función para actualizar los favoritos en la base de datos
async function actualizarFavoritos(userId, favoritos) {
  try {
    await db.query('UPDATE users SET favoritos = ? WHERE id = ?', [JSON.stringify(favoritos), userId]);
  } catch (error) {
    console.error('Error actualizando favoritos:', error);
  }
}

// Ruta para marcar una propiedad como favorita
router.post('/:id', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }
  let favoritos = await obtenerFavoritos(userId);
  if (!favoritos.includes(id)) {
    favoritos.push(id);
    await actualizarFavoritos(userId, favoritos);
  }
  res.json({ success: true, favoritos });
});

// Ruta para desmarcar una propiedad como favorita
router.delete('/:id', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }
  // Obtener favoritos
  let favoritos = await obtenerFavoritos(userId);
  // Asegurarse de que favoritos sea un array
  if (!Array.isArray(favoritos)) {
    favoritos = [];
  }
  // Filtrar la propiedad de favoritos
  favoritos = favoritos.filter(favId => favId !== id);
  // Actualizar los favoritos en la base de datos
  await actualizarFavoritos(userId, favoritos);
  res.json({ success: true, favoritos });
});


// Ruta para obtener las propiedades favoritas del usuario
router.get('/', async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }
  // Obtener favoritos
  const favoritos = await obtenerFavoritos(userId);
  const [propiedadesFavoritas] = await db.query(
    'SELECT * FROM properties WHERE id IN (?)', 
    [favoritos.length ? favoritos : [0]]
  );
  // Obtener todas las propiedades del usuario
  const [todasPropiedades] = await db.query(
    'SELECT * FROM properties WHERE ownerId = ?', [userId]
  );
  res.render('favoritos', { propiedadesFavoritas, todasPropiedades });
});


// Ruta para la página de propiedades en alquiler
router.get('/alquilar', async (req, res) => {
  const userId = req.session.userId;
  let favoritos = [];
  if (userId) {
    favoritos = await obtenerFavoritos(userId); // Ya devuelve un array, no es necesario JSON.parse()
  }
  const [propiedades] = await db.query('SELECT * FROM properties WHERE type = ?', [propiedades_type.ALQUILER]);
  res.render('alquilar', { propiedades, favoritos });
});


// Ruta para la página de propiedades en compra
router.get('/comprar', async (req, res) => {
  const userId = req.session.userId;
  let favoritos = [];
  if (userId) {
    favoritos = await obtenerFavoritos(userId);
  }
  const [propiedades] = await db.query('SELECT * FROM properties WHERE type = ?', [propiedades_type.VENTA]);
  res.render('comprar', { propiedades, favoritos });
});


module.exports = router;
