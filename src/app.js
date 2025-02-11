const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const db = require('./controllers/db'); // Base de datos y propiedades
const { agregarPropiedad, marcarFavorito, desmarcarFavorito } = require('./controllers/db');
const favoritosRoutes = require('./routes/favoritos');
const propertyRoutes = require('./routes/propertyRoutes');
const dotenv = require('dotenv');
dotenv.config();
// Inicialización de la aplicación
const app = express();
const PORT = 3000 || process.env.PORT;
// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../Public/images')),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });
// Acceso a las propiedades desde la base de datos
const propiedades = db.propiedades;
const propiedades_type = db.propiedades_type;
const propiedades_model = db.propiedades_model;
// Enrutador principal
const router = express.Router();
router.get('/', (req, res) => {
  const carruseles = { recomendado: propiedades, emprendimiento: propiedades };
  res.render('index', { carruseles });
});
// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, '../Public')));
app.use('/images', express.static(path.join(__dirname, '../Public/images')));
// Middleware para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configuración de la sesión
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// Middleware global para pasar el usuario a las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// Asegúrate de que la sesión esté correctamente inicializada
app.use((req, res, next) => {
  if (!req.session.favoritos) req.session.favoritos = [];
  next();
});
//-----------------------------------------------------(Rutas para manejar /alquilar, /comprar, /favoritos)
app.post('/favoritos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  marcarFavorito(req, id); // Usar la función modificada
  res.json({ success: true, favoritos: req.session.favoritos });
});
app.delete('/favoritos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  desmarcarFavorito(req, id); // Usar la función modificada
  res.json({ success: true, favoritos: req.session.favoritos });
});
// Aplica las rutas para /favoritos (asegúrate de que esto no interfiera con las anteriores)
app.use('/favoritos', favoritosRoutes);
// Rutas para alquilar y comprar
app.get('/alquilar', (req, res) => {
  // Asegúrate de que los favoritos estén en la sesión
  if (!req.session.favoritos) {
    req.session.favoritos = [];
  }
  const favoritos = req.session.favoritos;
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
  res.render('alquilar', { propiedades: propiedadesAlquiler, favoritos: favoritos, city: city});
});
app.get('/comprar', (req, res) => {
  // Asegúrate de que los favoritos estén en la sesión
  if (!req.session.favoritos) {
    req.session.favoritos = [];
  }
  const favoritos = req.session.favoritos;
  // Obtener el parámetro de búsqueda de ciudad
  const city = req.query.city ? req.query.city.trim().toLowerCase() : null;
  // Filtrar propiedades por tipo VENTA
  let propiedadesVenta = propiedades.filter(prop => prop.type === propiedades_type.VENTA);
  // Si hay una ciudad especificada, filtrar propiedades por ciudad
  if (city) {
    propiedadesVenta = propiedadesVenta.filter(prop => 
      prop.city.toLowerCase().includes(city)
    );
  }
  res.render('comprar', { propiedades: propiedadesVenta, favoritos: favoritos, city: city});
});
// Ruta para artículos
app.get('/articulo/:id', (req, res) => {
  if (!req.session.favoritos) {
    req.session.favoritos = [];
  }
  const favoritos = req.session.favoritos;
  const propiedades_type_invertido = Object.fromEntries(
    Object.entries(propiedades_type).map(([key, value]) => [value, key])
  );
  const propiedadId = parseInt(req.params.id);
  const propiedad = propiedades.find(p => p.id === propiedadId);
  if (propiedad) {
    res.render('articulo', { propiedad, propiedades_type_invertido, favoritos: favoritos });
  } else {
    res.status(404).send('Propiedad no encontrada');
  }
});
//-----------------------------------------------------(Fin de las rutas para manejar /alquilar /comprar /favoritos)
// Usar el enrutador en la aplicación
app.use('/', router);
// Rutas de autenticación
app.use('/auth', authRoutes);
// Rutas para archivos estáticos
const staticRoutes = {
  '/': 'index',
  '/alquilar': 'alquilar',
  '/comprar': 'comprar',
  '/login': 'login',
  '/register': 'register',
  '/favoritos': 'favoritos',
  '/terms': 'terms',
  '/post1': 'post-1',
  '/post2': 'post-2',
  '/post3': 'post-3',
  '/post4': 'post-4',
  '/articulo': 'articulo',
};
Object.keys(staticRoutes).forEach(route => {
  app.get(route, (req, res) => res.render(staticRoutes[route]));
});
app.use('/property', propertyRoutes(upload)); // Pasar "upload" como argumento
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
