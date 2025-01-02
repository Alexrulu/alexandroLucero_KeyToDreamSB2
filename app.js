const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/authRoutes'); // Requerir rutas de autenticación
const app = express();
const PORT = 3000;
const session = require('express-session');

const router = express.Router(); // Definir el enrutador

const db = require('./controllers/db');

router.get('/', (req, res) => {
    // Usamos las propiedades directamente
    const carruseles = {
      recomendado: db.propiedades.map(prop => prop.principalImage), // Usamos la imagen principal de cada propiedad
      emprendimiento: db.propiedades.map(prop => prop.principalImage)
    };
  
    // Pasamos el objeto carruseles a la vista
    res.render('index', { carruseles });
  });

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para procesar los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//(temporal)
app.use(session({
  secret: 'una-secreta-clave', // Puedes usar un valor fijo
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// Middleware para pasar el usuario de la sesión a las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Define `user` como variable local disponible en todas las vistas
    next();
});
// Aquí defines la ruta de cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy(); // Eliminar la sesión
    console.log("Sesión destruida"); // Verificación en el servidor
});
 // Usar el enrutador en la aplicación
app.use('/', router); // Asegúrate de usar el enrutador
// Rutas de autenticación
app.use('/auth', routes);
// Configurar las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
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

