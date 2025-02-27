const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// base de datos y propiedades
const db = require('../config/db');
const usersFilePath = path.join(__dirname, '../data/users.json');
const propiedades_type = db.propiedades_type;

// funciones
function obtenerFavoritos(userId) {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(u => u.id === userId);
  return user ? user.favoritos.map(id => Number(id)) : [];
}
function cargarPropiedades() {
  const filePath = path.join(__dirname, '../data/propiedades.json'); // Ajusta la ruta si es necesario
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}
function leerUsuarios() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer users.json:', error);
    return [];
  }
}

// rutas
router.get('/', (req, res) => {
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request
  const carruseles = { recomendado: propiedades, emprendimiento: propiedades };
  res.render('index', { carruseles, propiedades });
});

router.get('/alquilar', (req, res) => {
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request
  let favoritos = [];
  if (req.session.userId) {
    favoritos = obtenerFavoritos(req.session.userId);
  }
  // Obtener el parámetro de búsqueda de ciudad
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  // Filtrar propiedades por tipo ALQUILER
  let propiedadesAlquiler = propiedades.filter(prop => prop.type === propiedades_type.ALQUILER);
  // Si hay una ciudad especificada, filtrar propiedades por ciudad
  if (city) {
    propiedadesAlquiler = propiedadesAlquiler.filter(prop => 
      prop.city.toLowerCase().includes(city)
    );
  }
  // Renderizar la vista y pasar la variable city
  res.render('alquilar', { propiedades: propiedadesAlquiler, todasPropiedades: propiedades, favoritos, city: city});
});

router.get('/comprar', (req, res) => {
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request
  let favoritos = [];
  if (req.session.userId) {
    favoritos = obtenerFavoritos(req.session.userId);
  }
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  // Filtrar propiedades por tipo VENTA
  let propiedadesVenta = propiedades.filter(prop => prop.type === propiedades_type.VENTA);
  // Si hay una ciudad especificada, filtrar propiedades por ciudad
  if (city) {
    propiedadesVenta = propiedadesVenta.filter(prop => 
      prop.city.toLowerCase().includes(city)
    );
  }
  res.render('comprar', { propiedades: propiedadesVenta, todasPropiedades: propiedades, favoritos, city: city});
});

// Ruta para artículos
router.get('/articulo/:id', (req, res) => {
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request

  let favoritos = [];
  if (req.session.userId) {
    favoritos = obtenerFavoritos(req.session.userId);
  }
  const propiedades_type_invertido = Object.fromEntries(
    Object.entries(propiedades_type).map(([key, value]) => [value, key])
  );
  const propiedadId = parseInt(req.params.id);
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (propiedad) {
    res.render('articulo', { propiedad, propiedades_type_invertido,todasPropiedades: propiedades, favoritos });
  } else {
    res.status(404).send('Propiedad no encontrada');
  }
});

//---------ADMINISTRADOR--------
router.get('/propiedadesAdmin', (req, res) => {
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.status(403).send('Acceso denegado'); // Bloquea si no es admin
  }
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request
  // Obtener el parámetro de búsqueda de ciudad
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  // Filtrar propiedades por tipo VENTA
  res.render('propiedadesAdmin', { propiedades: propiedades, city: city});
});

router.get('/usuariosAdmin', (req, res) => {
  // Verifica si el usuario es un administrador
  if (!req.session.user || req.session.user.userType !== 'admin') {
    return res.status(403).send('Acceso denegado'); // Bloquea si no es admin
  }
  const searchQuery = req.query.search?.toLowerCase() || ''; // Si no hay búsqueda, se pasa un valor vacío
  const users = leerUsuarios(); // Obtener usuarios del JSON
  // Filtra los usuarios según la búsqueda (si hay)
  const filteredUsers = searchQuery
    ? users.filter(user => user.name.toLowerCase().includes(searchQuery))
    : users;
  // Pasamos los usuarios filtrados y la variable searchQuery a la vista
  res.render('usuariosAdmin', { users: filteredUsers, searchQuery: searchQuery });
});

// publicar una propiedad desde 4 vistas
router.get('/post1', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-1', { propiedades });
})
router.get('/post2', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-2', { propiedades });
})
router.get('/post3', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-3', { propiedades });
})
router.get('/post4', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-4', { propiedades });
})

module.exports = router;