// Requerir dependencias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/authRoutes'); // Rutas de autenticación
const db = require('./controllers/db'); // Base de datos y propiedades

// Inicialización de la aplicación
const app = express();
const PORT = 3000;
const router = express.Router(); // Definir el enrutador

// Acceso a las propiedades desde la base de datos
const propiedades = db.propiedades;
const propiedades_type = db.propiedades_type;

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la sesión
app.use(session({
  secret: 'una-secreta-clave',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware global para pasar el usuario a las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Definir `user` como variable local
    next();
});

// Rutas de la aplicación

// Ruta principal
router.get('/', (req, res) => {
    const carruseles = {
      recomendado: propiedades,
      emprendimiento: propiedades
    };
    res.render('index', { carruseles });
});

// Ruta para alquilar y comprar
app.get('/alquilar', (req, res) => {
    // Filtrar las propiedades de tipo ALQUILER
    const propiedadesAlquiler = propiedades.filter(propiedad => propiedad.type === propiedades_type.ALQUILER);
    res.render('alquilar', { propiedades: propiedadesAlquiler });
});
app.get('/comprar', (req, res) => {
    // Filtrar las propiedades de tipo VENTA
    const propiedadesVENTA = propiedades.filter(propiedad => propiedad.type === propiedades_type.VENTA);
    res.render('comprar', { propiedades: propiedadesVENTA });
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
    req.session.destroy(); // Eliminar la sesión
    console.log("Sesión destruida"); // Verificación en el servidor
});

// Usar el enrutador en la aplicación
app.use('/', router);

// Rutas de autenticación
app.use('/auth', routes);

// Rutas de archivos estáticos
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
    '/articulo': 'articulo'
};

Object.keys(staticRoutes).forEach(route => {
    app.get(route, (req, res) => {
        res.render(staticRoutes[route]);
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// require('dotenv').config(); // Descomentar esto en caso de producción (manipulacion de registros)
// Configurar el middleware de sesión
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));
//"dotenv": "^16.4.7", <-(devolver a dependencias en package.json, en caso de produccion)

