const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../database/config/db');

//----------------------------------------------------------REGISTER---------------
router.post('/process-register', async (req, res) => {
  const { userType, email, password, name, razonSocial, fiscalCondition, dni, phone, cellphone, terms, privacyPolicy } = req.body;
  if (!userType || !email || !password || !name || !dni || !cellphone || !terms || !privacyPolicy) {
    return res.status(400).send('Por favor, complete todos los campos requeridos.');
  }
  try {
    const [users] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
    if (users.length > 0) {
      return res.status(400).send('Este correo ya está registrado.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      userType,
      email,
      password: hashedPassword,
      name,
      razonSocial,
      fiscalCondition,
      dni,
      phone,
      cellphone
    };
    await db.execute(
      'INSERT INTO users (id, userType, email, password, name, razonSocial, fiscalCondition, dni, phone, cellphone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      Object.values(newUser)
    );
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
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
    }
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
    }
    // Establecer la sesión
    req.session.user = user;
    req.session.userId = user.id;
    // Si el usuario seleccionó "Recordarme", la sesión debe persistir por 7 días
    if (rememberMe) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000;  // 7 días
    } else {
      // Si no se seleccionó "Recordarme", la sesión durará solo hasta que se cierre el navegador
      req.session.cookie.maxAge = null;
    }
    console.log('Usuario logueado:', user);
    res.json({ success: true, redirectTo: '/' });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

//---------------------------------------------------LOGOUT------------------------
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    console.log("Sesión cerrada");
    res.json({ success: true });
  });
});

module.exports = router;
