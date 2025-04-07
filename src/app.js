const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// entorno
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// vistas
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// rutas
const authRoutes = require('./routes/authRoutes');
const favoritosRoutes = require('./routes/favRoutes');
const postPropertyRoutes = require('./routes/postPropertyRoutes');
const interactionsWithPropertyRoutes = require('./routes/interactionsWithPropertyRoutes');
const updateDeleteRoutes = require('./routes/updateDeleteRoutes');

// Almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // se recomienda evitar duplicados
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  if (
    (file.fieldname === 'mainImage' || file.fieldname === 'secondaryImages') &&
    allowedImageTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido.'));
  }
};

// Middleware multer con seguridad
const upload = multer({
  storage,
  fileFilter,
});

// mddleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: null,  // Deja como null para que no persista si no se elige "Recordarme"
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// pasar usuario a todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// rutas
app.use('/favoritos', favoritosRoutes);
app.use('/', interactionsWithPropertyRoutes);
app.use('/auth', authRoutes);
app.use('/property', postPropertyRoutes(upload));
app.use(updateDeleteRoutes);

// vistas
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
  '/propiedadesAdmin': 'propiedadesAdmin',
  '/usuariosAdmin': 'usuariosAdmin',
};
Object.keys(staticRoutes).forEach(route => {
  app.get(route, (req, res) => res.render(staticRoutes[route]));
});

// servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
