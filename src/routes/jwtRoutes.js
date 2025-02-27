const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json'); // Ajusta la ruta según tu proyecto

function leerUsuarios() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer users.json:', error);
    return [];
  }
}

function verificarSesion(req, res, next) {
  if (!req.session.user && req.cookies.remember_token) {
    try {
      const decoded = jwt.verify(req.cookies.remember_token, process.env.JWT_SECRET);
      const usersDatabase = leerUsuarios();
      const user = usersDatabase.find(u => u.id === decoded.userId);

      if (user) {
        req.session.user = user;
        req.session.userId = user.id;
      } else {
        res.clearCookie('remember_token'); // Si el usuario no existe, limpiamos la cookie
      }
    } catch (err) {
      res.clearCookie('remember_token'); // Si el token es inválido, lo eliminamos
    }
  }
  console.log('🛠️ Sesión actual:', req.session);
  next();
}

module.exports = verificarSesion;
