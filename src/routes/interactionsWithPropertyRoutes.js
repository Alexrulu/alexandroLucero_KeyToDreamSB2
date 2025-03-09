const express = require('express');
const router = express.Router();
const db = require('../database/config/db'); // Conexión a MySQL
const functions = require('../services/functions');
const propiedades_type = functions.propiedades_type;

// Función para obtener los favoritos del usuario desde la base de datos
async function obtenerFavoritos(userId) {
  try {
    const [rows] = await db.query('SELECT favoritos FROM users WHERE id = ?', [userId]);
    if (rows.length === 0 || !rows[0].favoritos) return [];
    // Verificamos si ya es un array
    return Array.isArray(rows[0].favoritos) ? rows[0].favoritos : [];
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    return [];
  }
}

// Función para obtener todas las propiedades
async function cargarPropiedades() {
  try {
    const [propiedades] = await db.query('SELECT * FROM properties');
    return propiedades;
  } catch (error) {
    console.error('Error obteniendo propiedades:', error);
    return [];
  }
}

// Función para obtener todos los usuarios
async function cargarUsuarios() {
  try {
    const [users] = await db.query('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return [];
  }
}

// Rutas
router.get('/', async (req, res) => {
  const propiedades = await cargarPropiedades();
  const carruseles = { recomendado: propiedades, emprendimiento: propiedades };
  res.render('index', { carruseles, propiedades });
});

router.get('/alquilar', async (req, res) => {
  const propiedades = await cargarPropiedades();
  let favoritos = [];
  if (req.session.userId) {
    favoritos = await obtenerFavoritos(req.session.userId);
  }
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  let propiedadesAlquiler = propiedades.filter(prop => prop.type === propiedades_type.ALQUILER);
  if (city) {
    propiedadesAlquiler = propiedadesAlquiler.filter(prop => prop.city.toLowerCase().includes(city));
  }
  res.render('alquilar', { propiedades: propiedadesAlquiler, todasPropiedades: propiedades, favoritos, city });
});

router.get('/comprar', async (req, res) => {
  const propiedades = await cargarPropiedades();
  let favoritos = [];
  if (req.session.userId) {
    favoritos = await obtenerFavoritos(req.session.userId);
  }
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  let propiedadesVenta = propiedades.filter(prop => prop.type === propiedades_type.VENTA);
  if (city) {
    propiedadesVenta = propiedadesVenta.filter(prop => prop.city.toLowerCase().includes(city));
  }
  res.render('comprar', { propiedades: propiedadesVenta, todasPropiedades: propiedades, favoritos, city });
});

router.get('/articulo/:id', async (req, res) => {
  const propiedadId = parseInt(req.params.id);
  const propiedades = await cargarPropiedades();
  let favoritos = [];
  if (req.session.userId) {
    favoritos = await obtenerFavoritos(req.session.userId);
  }
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (propiedad) {
    res.render('articulo', { propiedad, todasPropiedades: propiedades, favoritos });
  } else {
    res.status(404).send('Propiedad no encontrada');
  }
});

//---------ADMINISTRADOR--------
// Ruta para ver todas las propiedades en la vista de administrador
router.get('/propiedadesAdmin', async (req, res) => {
  if (!req.session.user || req.session.user.userType !== 0) {
    return res.status(403).send('Acceso denegado'); // Bloquea si no es admin
  }
  const propiedades = await cargarPropiedades();
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  res.render('propiedadesAdmin', { propiedades, city });
});

// Ruta para ver la lista de usuarios en la vista de administrador
router.get('/usuariosAdmin', async (req, res) => {
  if (!req.session.user || req.session.user.userType !== 0) {
    return res.status(403).send('Acceso denegado'); // Bloquea si no es admin
  }
  const searchQuery = req.query.search?.toLowerCase() || '';
  const users = await cargarUsuarios();
  // Filtra los usuarios según la búsqueda (si hay)
  const filteredUsers = searchQuery
    ? users.filter(user => user.name.toLowerCase().includes(searchQuery))
    : users;
  res.render('usuariosAdmin', { users: filteredUsers, searchQuery });
});


// Rutas para publicar una propiedad desde 4 vistas
router.get('/post1', async (req, res) => {
  const propiedades = await cargarPropiedades();
  res.render('post-1', { propiedades });
});
router.get('/post2', async (req, res) => {
  const propiedades = await cargarPropiedades();
  res.render('post-2', { propiedades });
});
router.get('/post3', async (req, res) => {
  const propiedades = await cargarPropiedades();
  res.render('post-3', { propiedades });
});
router.get('/post4', async (req, res) => {
  const propiedades = await cargarPropiedades();
  res.render('post-4', { propiedades });
});

module.exports = router;