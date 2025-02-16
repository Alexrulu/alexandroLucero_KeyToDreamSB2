const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '../controllers/users.json');
// Función para leer los usuarios desde el archivo JSON
function leerUsuarios() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer users.json:', error);
    return [];
  }
}
// Función para escribir los usuarios en el archivo JSON
function guardarUsuarios(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Error al escribir en users.json:', error);
  }
}
//----------------------------------------------------------REGISTER---------------
router.post('/process-register', async (req, res) => {
  const { userType, email, password, name, razonSocial, fiscalCondition, dni, phone, cellphone, terms, privacyPolicy } = req.body;
  if (!userType || !email || !password || !name || !dni || !cellphone || !terms || !privacyPolicy) {
    return res.status(400).send('Por favor, complete todos los campos requeridos.');
  }
  const usersDatabase = leerUsuarios();
  // Verificar si el usuario ya existe
  if (usersDatabase.some(user => user.email === email)) {
    return res.status(400).send('Este correo ya está registrado.');
  }
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = {
      id: uuidv4(),
      userType,
      email,
      password: hashedPassword,  // Guardamos la versión encriptada
      name,
      razonSocial,
      fiscalCondition,
      dni,
      phone,
      cellphone,
    };
    usersDatabase.push(newUser);
    guardarUsuarios(usersDatabase);
    console.log('Nuevo usuario registrado:', newUser);
    res.redirect('/login');
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).send('Error en el servidor');
  }
});
//-----------------------------------------------------------LOGIN-----------------
router.post('/process-login', async (req, res) => {
  const { email, password, rememberMe } = req.body; // Captura rememberMe

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, complete todos los campos.' });
  }

  const usersDatabase = leerUsuarios();
  const user = usersDatabase.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
  }

  req.session.user = user;
  req.session.userId = user.id;

  // Si el usuario eligió "Recordarme", guardamos una cookie persistente
  if (rememberMe) {
    res.cookie('userId', user.id, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
  }

  console.log('Usuario logueado:', user);
  res.json({ success: true, redirectTo: '/' });
});

//---------------------------------------------------LOGOUT------------------------
router.get('/logout', (req, res) => {
  res.clearCookie('userId'); // Eliminar cookie
  req.session.destroy(err => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    console.log("Sesión cerrada");
    res.json({ success: true });
  });
});
module.exports = router;