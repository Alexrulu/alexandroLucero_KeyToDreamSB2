const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const usersFilePath = path.join(__dirname, '../data/users.json');
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
    return res.status(400).send('Por favor, complete todos los campos requeridos.')
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
      favoritos: []
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
  const { email, password, rememberMe } = req.body;

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

  // Si el usuario elige "Recordarme", generamos un token JWT en la cookie
  if (rememberMe) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('remember_token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      httpOnly: true, // Protege contra ataques XSS
      secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
      path: '/', // Asegúrate de que la cookie esté disponible en todo el sitio
      sameSite: 'Lax' // Si usas cookies entre diferentes sitios o subdominios
    });
  }

  console.log('Usuario logueado:', user);
  res.json({ success: true, redirectTo: '/' });
});

//---------------------------------------------------LOGOUT------------------------
router.get('/logout', (req, res) => {
  // Eliminar las cookies
  res.clearCookie('userId');
  res.clearCookie('remember_token'); // Eliminar cookie de remember_token

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