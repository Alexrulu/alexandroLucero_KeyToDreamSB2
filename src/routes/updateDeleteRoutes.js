const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const { eliminarPropiedad, modificarPropiedad } = require('../config/db');
const usersFilePath = path.join(__dirname, '../data/users.json');

// función para leer el archivo de usuarios
function readUsersFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) return reject('Error al leer el archivo');
      resolve(JSON.parse(data));
    });
  });
}

// función para escribir en el archivo de usuarios
function writeUsersFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) return reject('Error al escribir en el archivo');
      console.log('Archivo actualizado correctamente:', data);
      resolve();
    });
  });
}

// eliminar propiedad
router.delete('/propiedades/:id', (req, res) => {
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

// actualizar propiedad
router.put('/propiedades/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nuevaData = req.body;
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

// actualizar usuario
router.post('/update-profile', async (req, res) => {
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

// eliminar usuario
router.post('/delete-user', async (req, res) => {
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

module.exports = router;
