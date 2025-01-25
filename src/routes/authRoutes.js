const express = require('express');
const router = express.Router();
// Simulamos una base de datos en memoria
let usersDatabase = []; 
// Al cerrar la aplicación, los datos desaparecen
// Ruta para la página principal
router.get('/', (req, res) => {
  if (req.session.user) {
    // Si el usuario está logueado, pasamos sus datos al renderizar la página
    res.render('index', { user: req.session.user });
  } else {
    // Si no está logueado, simplemente renderizamos la página sin datos del usuario
    res.render('index');
  }
});

//----------------------------------------------------------REGISTER---------------
// Ruta para procesar el registro
router.post('/process-register', (req, res) => {
  const { userType, email, password, name, razonSocial, fiscalCondition, dni, phone, cellphone, terms, privacyPolicy } = req.body;
  // Verificar si todos los campos requeridos fueron enviados
  if (!userType || !email || !password || !name || !dni || !cellphone || !terms || !privacyPolicy) {
    return res.status(400).send('Por favor, complete todos los campos requeridos.');
  }
  // Crear el nuevo usuario (esto depende de tu base de datos, por ahora solo imprimimos los datos)
  const newUser = {
    userType,
    email,
    password,  // Guardamos la contraseña tal cual (sin hashing)
    name,
    razonSocial,
    fiscalCondition,
    dni,
    phone,
    cellphone,
  };
  // Agregar el nuevo usuario a la "base de datos" ficticia
  usersDatabase.push(newUser);
  // Mostrar los datos del nuevo usuario en la consola
  console.log('Nuevo usuario registrado:', newUser);
  // Redirigir al login
  res.redirect('/login');
});
//-----------------------------------------------------------LOGIN-----------------
router.post('/process-login', (req, res) => {
  const { email, password } = req.body;
  // Verificar si los campos están completos
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
  }
  // Buscar al usuario en la "base de datos"
  const user = usersDatabase.find(u => u.email === email);
  // Si el usuario no existe o la contraseña no coincide
  if (!user || user.password !== password) {
    return res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
  }
  // Si todo es correcto, guardamos los datos del usuario en la sesión
  req.session.user = user;
  // Redirigir a la página de inicio
  res.json({ success: true, redirectTo: '/' });
});
//---------------------------------------------------cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    console.log("Sesión cerrada");
    res.json({ success: true }); // Envía una respuesta JSON para manejarla en el cliente
  });
});

module.exports = router;
