const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const multer = require('multer');
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const db = require('./controllers/db'); // Base de datos y propiedades
const { agregarPropiedad, marcarFavorito, desmarcarFavorito } = require('./controllers/db');
const favoritosRoutes = require('./routes/favoritos');
const propertyRoutes = require('./routes/propertyRoutes');
const dotenv = require('dotenv');
const { eliminarPropiedad } = require('./controllers/db');
const { modificarPropiedad } = require('./controllers/db');
const usersFilePath = path.join(__dirname, './controllers/users.json');
const propiedadesFilePath = path.join(__dirname, './controllers/propiedades.json');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cookieParser());
// Inicialización de la aplicación
const PORT = 3000 || process.env.PORT;
// Configuración de Multer para la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../Public/images')),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });
// Acceso a las propiedades desde la base de datos
function obtenerFavoritos(userId) {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(u => u.id === userId);
  return user ? user.favoritos.map(id => Number(id)) : [];
}
function cargarPropiedades() {
  const filePath = path.join(__dirname, './controllers/propiedades.json'); // Ajusta la ruta si es necesario
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
const propiedades_type = db.propiedades_type;
const propiedades_model = db.propiedades_model;
// Enrutador principal
const router = express.Router();
router.get('/', (req, res) => {
  const propiedades = cargarPropiedades(); // 📌 Leer el archivo en cada request
  const carruseles = { recomendado: propiedades, emprendimiento: propiedades };
  res.render('index', { carruseles, propiedades });
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
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días de sesión persistente
    httpOnly: true, // Protege contra ataques XSS
    secure: false  // Ponlo en true si usas HTTPS
  }
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
app.use((req, res, next) => {
  if (!req.session.user && req.cookies.userId) {
    const usersDatabase = leerUsuarios();
    const user = usersDatabase.find(u => u.id === req.cookies.userId);
    if (user) {
      req.session.user = user;
      req.session.userId = user.id;
    }
  }
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
app.get('/comprar', (req, res) => {
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

//---------ADMINISTRADOR--------
app.get('/propiedadesAdmin', (req, res) => {
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





// Ruta para artículos
app.get('/articulo/:id', (req, res) => {
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
app.delete('/propiedades/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(400).json({ success: false, message: 'ID inválido' });
  }

  const eliminado = eliminarPropiedad(id);

  if (eliminado) {
    res.json({ success: true, message: `Propiedad con ID ${id} eliminada.` });
  } else {
    res.status(404).json({ success: false, message: `No se encontró la propiedad con ID ${id}.` });
  }
});
app.put('/propiedades/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nuevaData = req.body; // Datos actualizados enviados desde el cliente

  if (!id || !nuevaData) {
    return res.status(400).json({ success: false, message: 'ID inválido o datos incorrectos' });
  }

  const actualizado = modificarPropiedad(id, nuevaData);

  if (actualizado) {
    res.json({ success: true, message: `Propiedad con ID ${id} modificada con éxito.` });
  } else {
    res.status(404).json({ success: false, message: `No se encontró la propiedad con ID ${id}.` });
  }
});

app.get('/post1', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-1', { propiedades });
})
app.get('/post2', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-2', { propiedades });
})
app.get('/post3', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-3', { propiedades });
})
app.get('/post4', (req, res) => {
  const propiedades = cargarPropiedades();
  res.render('post-4', { propiedades });
})

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
  '/propiedadesAdmin': 'propiedadesAdmin',
  '/usuariosAdmin': 'usuariosAdmin',
};
Object.keys(staticRoutes).forEach(route => {
  app.get(route, (req, res) => res.render(staticRoutes[route]));
});





// Ruta para actualizar el perfil
// Función para leer el archivo
function readUsersFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject('Error al leer el archivo');
      }
      resolve(JSON.parse(data));
    });
  });
}

// Función para escribir en el archivo
function writeUsersFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject('Error al escribir en el archivo');
      }
      console.log('Archivo actualizado correctamente:', data);  // Verifica los datos
      resolve();
    });
  });
}


// Ruta para actualizar el perfil
app.post('/update-profile', async (req, res) => {
  const { id, name, phone, cellphone } = req.body;

  try {
    const users = await readUsersFile(); // Lee los datos
    
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.json({ success: false, message: 'Usuario no encontrado' });
    }

    // Actualiza los datos del usuario
    users[userIndex].name = name;
    users[userIndex].phone = phone;
    users[userIndex].cellphone = cellphone;

    await writeUsersFile(users); // Guarda los datos actualizados

    // Aquí actualizamos la sesión con los nuevos datos
    req.session.user = { 
      ...req.session.user, 
      name: name, 
      phone: phone, 
      cellphone: cellphone 
    };
    
    res.json({ success: true, message: 'Datos actualizados con éxito' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ success: false, message: error });
  }
});

app.post('/delete-user', async (req, res) => {
  const { id } = req.body; // Obtener el ID del usuario a eliminar

  try {
    let users = await readUsersFile(); // Leer los datos actuales

    // Buscar el usuario en la lista
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return res.json({ success: false, message: 'Usuario no encontrado' });
    }

    // Eliminar el usuario de la lista
    users.splice(userIndex, 1);

    // Guardar los cambios en el archivo
    await writeUsersFile(users);

    // Si el usuario eliminado es el usuario autenticado, cerrar la sesión
    if (req.session.user && req.session.user.id === id) {
      req.session.destroy(err => {
        if (err) {
          console.error('Error al cerrar sesión:', err);
          return res.json({ success: false, message: 'Error al cerrar sesión' });
        }
        res.json({ success: true, message: 'Usuario eliminado y sesión cerrada' });
      });
    } else {
      res.json({ success: true, message: 'Usuario eliminado' });
    }

  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.json({ success: false, message: 'Error al eliminar usuario' });
  }
});


app.use('/property', propertyRoutes(upload)); // Pasar "upload" como argumento
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
