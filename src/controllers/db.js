const fs = require('fs');
const path = require('path');
const propiedades_type = { VENTA: 1, ALQUILER: 2, TEMPORADA: 3 };
const propiedades_model = { CASA: 1, DEPARTAMENTO: 2, PH: 3, CONDOMINIO: 4 };
const propiedades = require("./propiedades.json");
const propiedadesFilePath = path.join(__dirname, 'propiedades.json');
const usersFilePath = path.join(__dirname, 'users.json');
// Marcar una propiedad como favorita
function marcarFavorito(req, id) {
  const userId = req.session.userId;
  if (!userId) {
    console.log('Usuario no autenticado');
    return;
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(u => u.id === userId);
  if (!user) {
    console.log('Usuario no encontrado');
    return;
  }

  id = Number(id); // Convertimos a número para que coincida con los guardados en favoritos

  if (!user.favoritos.includes(id)) {
    user.favoritos.push(id);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log(`Propiedad con ID ${id} marcada como favorita.`);
  } else {
    console.log(`La propiedad con ID ${id} ya está en favoritos.`);
  }
}

function desmarcarFavorito(req, id) {
  const userId = req.session.userId;
  if (!userId) {
    console.log('Usuario no autenticado');
    return;
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(u => u.id === userId);
  if (!user) {
    console.log('Usuario no encontrado');
    return;
  }

  id = Number(id); // Convertimos a número para asegurar que coincide

  user.favoritos = user.favoritos.filter(favId => favId !== id);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  console.log(`Propiedad con ID ${id} removida de favoritos.`);
}
function obtenerFavoritos(userId) {
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(u => u.id === userId);
  if (!user) {
    console.log('Usuario no encontrado');
    return [];
  }

  // Convertimos los IDs de las propiedades en números para asegurar coincidencias
  return propiedades.filter(propiedad => user.favoritos.includes(Number(propiedad.id)));
}


// Agregar una nueva propiedad y devolver su ID
function agregarPropiedad(nuevaPropiedad) {
  try {
    const data = fs.readFileSync(propiedadesFilePath, 'utf8');
    const propiedades = JSON.parse(data);
    
    nuevaPropiedad.id = propiedades.length + 1; // Asigna un ID único
    propiedades.push(nuevaPropiedad);

    fs.writeFileSync(propiedadesFilePath, JSON.stringify(propiedades, null, 2), 'utf8');

    console.log('✅ Propiedad agregada con éxito:', nuevaPropiedad);
    return nuevaPropiedad.id;
  } catch (error) {
    console.error('❌ Error al guardar la propiedad:', error);
    return null;
  }
}
function eliminarPropiedad(id) {
  try {
    const data = fs.readFileSync(propiedadesFilePath, 'utf8');
    let propiedades = JSON.parse(data);

    // Filtrar propiedades para eliminar la seleccionada
    const nuevasPropiedades = propiedades.filter(propiedad => propiedad.id !== id);

    if (nuevasPropiedades.length === propiedades.length) {
      console.log(`⚠️ No se encontró la propiedad con ID ${id}`);
      return false;
    }

    // Guardar la nueva lista sin la propiedad eliminada
    fs.writeFileSync(propiedadesFilePath, JSON.stringify(nuevasPropiedades, null, 2), 'utf8');
    console.log(`✅ Propiedad con ID ${id} eliminada correctamente`);

    return true;
  } catch (error) {
    console.error('❌ Error al eliminar la propiedad:', error);
    return false;
  }
}
function modificarPropiedad(id, nuevaData) {
  try {
    const data = fs.readFileSync(propiedadesFilePath, 'utf8');
    let propiedades = JSON.parse(data);

    const index = propiedades.findIndex(prop => prop.id === id);
    if (index === -1) return false; // No se encontró la propiedad

    // Actualizar datos
    propiedades[index] = { ...propiedades[index], ...nuevaData };

    // Guardar cambios
    fs.writeFileSync(propiedadesFilePath, JSON.stringify(propiedades, null, 2), 'utf8');

    console.log(`✅ Propiedad con ID ${id} modificada con éxito.`);
    return true;
  } catch (error) {
    console.error('❌ Error al modificar la propiedad:', error);
    return false;
  }
}
module.exports = {
  propiedades,
  propiedades_type,
  propiedades_model,
  agregarPropiedad,
  marcarFavorito,
  desmarcarFavorito,
  obtenerFavoritos,
  eliminarPropiedad,
  modificarPropiedad,
};