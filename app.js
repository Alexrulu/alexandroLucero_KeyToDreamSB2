// Requerir dependencias
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/authRoutes'); // Rutas de autenticación
const db = require('./controllers/db'); // Base de datos y propiedades
const { agregarPropiedad } = require('./controllers/db');
const { log } = require('console');
const imagesDir = path.join(__dirname, 'Public/images');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta de destino
    cb(null, path.join(__dirname, 'Public/images'));
  },
  filename: (req, file, cb) => {
    // Mantén el nombre original del archivo
    cb(null, file.originalname);
  },
});

// Configura multer con el nuevo almacenamiento
const upload = multer({ storage });


// Inicialización de la aplicación
const app = express();
const PORT = 3000;
const router = express.Router(); // Definir el enrutador

// Acceso a las propiedades desde la base de datos
const propiedades = db.propiedades;
const propiedades_type = db.propiedades_type;
const propiedades_model = db.propiedades_model;

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

//-----------------------PUBLICAR-------------------------------
app.use(express.urlencoded({ extended: true })); // Middleware para procesar formularios
// Ruta para procesar el primer paso del formulario
app.post('/save-property-step1', (req, res) => {
    const data = req.body;
  
    // Mapea los valores del formulario al modelo esperado
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
  
    // Guardamos la información en la sesión
    req.session.propiedad = req.session.propiedad || {}; // Aseguramos que exista un objeto propiedad
    req.session.propiedad.step1 = nuevaPropiedad;
  
    console.log(nuevaPropiedad);
    
    // Redirigimos al siguiente paso
    res.redirect('/post2');
  });
  //---------------paso2-----------------------------------
  app.post('/save-property-step2', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'secondaryImages', maxCount: 32 },
    { name: 'floorPlanImage', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]), (req, res) => {
    const propiedad = req.session.propiedad || {};
  
    // Accedemos a los archivos cargados
    const files = req.files;
  
    propiedad.step2 = {
      principalImage: files.mainImage 
        ? `/images/${files.mainImage[0].originalname}` 
        : undefined, // Imagen principal
      secondaryImages: files.secondaryImages 
        ? files.secondaryImages.map(file => `/images/${file.originalname}`) 
        : [], // Imágenes secundarias
      plan: files.floorPlanImage 
        ? `/images/${files.floorPlanImage[0].originalname}` 
        : '', // Imagen de plano
      video: files.video 
        ? `/images/${files.video[0].originalname}` 
        : '' // Video
    };
  
    // Guardamos la propiedad en la sesión
    req.session.propiedad = req.session.propiedad || [];
  
    console.log('Propiedad después del paso 2:', propiedad);
  
    res.redirect('/post3');
  });
  
  
  // Ruta para procesar el tercer paso (más detalles)
  app.post('/save-property-step3', (req, res) => {
    const data = req.body;
    const propiedad = req.session.propiedad || {}; // Si no hay propiedad, crea un objeto vacío.
  
    // Agregar datos de contacto a la propiedad
    propiedad.step3 = {
      contactType: data.contactType === 'inmobiliaria' ? 1 : 2, // 1 para inmobiliaria, 2 para dueño directo
      email: data.email,
      personalName: data.fullName,
      phoneBusiness: data.phone || null, // Si no hay teléfono, se guarda como null
      phonePersonal: data.cell || null // Si no hay celular, se guarda como null
    };

  // Guardar la propiedad en la sesión
  req.session.propiedad = propiedad;
  
  console.log('Propiedad después del paso 3:', propiedad);
  
  // Redirigir al siguiente paso
  res.redirect('/post4');
});

// Ruta para publicar la propiedad cuando todo está listo
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
  } else {
    res.redirect(`/post4?error=Faltan datos para finalizar la publicación.`);
  }
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

