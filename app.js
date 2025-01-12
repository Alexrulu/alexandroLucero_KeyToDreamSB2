const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const routes = require('./routes/authRoutes'); // Rutas de autenticación
const db = require('./controllers/db'); // Base de datos y propiedades
const { agregarPropiedad, marcarFavorito, desmarcarFavorito } = require('./controllers/db');
const favoritosRoutes = require('./routes/favoritos');
// const {}

// Inicialización de la aplicación
const app = express();
const PORT = 3000;

// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'Public/images')),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'Public/images')));

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
  res.locals.user = req.session.user || null;
  next();
});


// Asegúrate de que la sesión esté correctamente inicializada
app.use((req, res, next) => {
  if (!req.session.favoritos) req.session.favoritos = [];
  next();
});

// Rutas para manejar favoritos
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
  const propiedadesAlquiler = propiedades.filter(prop => prop.type === propiedades_type.ALQUILER);

  res.render('alquilar', { propiedades: propiedadesAlquiler, favoritos: favoritos });
});
app.get('/comprar', (req, res) => {
  // Asegúrate de que los favoritos estén en la sesión
  if (!req.session.favoritos) {
    req.session.favoritos = [];
  }

  const favoritos = req.session.favoritos;
  const propiedadesVenta = propiedades.filter(prop => prop.type === propiedades_type.VENTA);
  res.render('comprar', { propiedades: propiedadesVenta, favoritos: favoritos });
});


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

// Ruta para artículos
app.get('/articulo/:id', (req, res) => {
  const propiedades_type_invertido = Object.fromEntries(
    Object.entries(propiedades_type).map(([key, value]) => [value, key])
  );
  const propiedadId = parseInt(req.params.id);
  const propiedad = propiedades.find(p => p.id === propiedadId);

  if (propiedad) {
    res.render('articulo', { propiedad, propiedades_type_invertido });
  } else {
    res.status(404).send('Propiedad no encontrada');
  }
});


// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  console.log("Sesión destruida");
});

// Usar el enrutador en la aplicación
app.use('/', router);
// Rutas de autenticación
app.use('/auth', routes);

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
  '/articulo': 'articulo'
};

Object.keys(staticRoutes).forEach(route => {
  app.get(route, (req, res) => res.render(staticRoutes[route]));
});

// Rutas para publicar propiedades (pasos)
app.post('/save-property-step1', (req, res) => {
  const data = req.body;
  const nuevaPropiedad = {
    type: propiedades_type[data.type.toUpperCase()],
    model: propiedades_model[data.model.toUpperCase()],
    adress: data.address,
    city: data.city,
    m2tot: Number(data.total_area),
    m2cov: Number(data.covered_area),
    ambiente: Number(data.rooms),
    bathroom: Number(data.bathrooms),
    cars: Number(data.parking),
    bedroom: Number(data.bedrooms),
    kitchen: data.features?.includes('cocina') ? 1 : 0,
    pool: data.features?.includes('piscina') ? 1 : 0,
    balcony: data.features?.includes('balcon') ? 1 : 0,
    grill: data.features?.includes('parrilla') ? 1 : 0,
    laundry: data.features?.includes('lavadero') ? 1 : 0,
    vigilance: data.features?.includes('vigilancia') ? 1 : 0,
  };

  req.session.propiedad = req.session.propiedad || {};
  req.session.propiedad.step1 = nuevaPropiedad;

  console.log(nuevaPropiedad);
  res.redirect('/post2');
});

app.post('/save-property-step2', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'secondaryImages', maxCount: 32 },
  { name: 'video', maxCount: 1 }
]), (req, res) => {
  const propiedad = req.session.propiedad || {};
  const files = req.files;

  propiedad.step2 = {
    principalImage: files.mainImage ? `/images/${files.mainImage[0].originalname}` : undefined,
    secondaryImages: files.secondaryImages 
      ? files.secondaryImages.map(file => `/images/${file.originalname}`) : [],
    video: files.video ? `/images/${files.video[0].originalname}` : ''
  };

  req.session.propiedad = req.session.propiedad || {};
  req.session.propiedad.step2 = propiedad.step2;

  console.log('Propiedad después del paso 2:', propiedad);
  res.redirect('/post3');
});

app.post('/save-property-step3', (req, res) => {
  const data = req.body;
  const propiedad = req.session.propiedad || {};

  propiedad.step3 = {
    contactType: data.contactType === 'inmobiliaria' ? 1 : 2,
    email: data.email,
    personalName: data.fullName,
    phoneBusiness: data.phone || null,
    phonePersonal: data.cell || null
  };

  req.session.propiedad = propiedad;
  console.log('Propiedad después del paso 3:', propiedad);
  res.redirect('/post4');
});

app.post('/publish-property', (req, res) => {
  const propiedad = req.session.propiedad || {};
  if (propiedad.step1 && propiedad.step2 && propiedad.step3 && req.body.price && req.body.description) {
    propiedad.step4 = {
      price: Number(req.body.price),
      description: req.body.description
    };

    const propiedadNueva = {
      ...propiedad.step1,
      ...propiedad.step2,
      ...propiedad.step3,
      ...propiedad.step4
    };

    agregarPropiedad(propiedadNueva);
    delete req.session.propiedad;
    res.redirect('/');
  } else {
    res.redirect(`/post4?error=Faltan datos para finalizar la publicación.`);
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
