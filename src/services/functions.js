const db = require('../database/config/db'); // Conexión a MySQL
const propiedades_type = { VENTA: 1, ALQUILER: 2, TEMPORADA: 3 };
const propiedades_model = { CASA: 1, DEPARTAMENTO: 2, PH: 3, CONDOMINIO: 4 };

// Marcar una propiedad como favorita
async function marcarFavorito(req, id) {
    const userId = req.session.userId;
    if (!userId) {
        console.log('Usuario no autenticado');
        return;
    }
    id = Number(id); // Asegurar que es un número

    try {
        // Obtener favoritos actuales
        const [result] = await db.execute('SELECT favoritos FROM usuarios WHERE id = ?', [userId]);
        if (result.length === 0) {
            console.log('Usuario no encontrado');
            return;
        }
        let favoritos = result[0].favoritos || []; // Aseguramos que favoritos sea un array vacío si no hay ninguno
        if (!favoritos.includes(id)) {
            favoritos.push(id);
            // Guardar de nuevo en la base de datos
            await db.execute('UPDATE usuarios SET favoritos = ? WHERE id = ?', [favoritos, userId]);
            console.log(`✅ Propiedad con ID ${id} marcada como favorita.`);
        } else {
            console.log(`⚠️ La propiedad con ID ${id} ya está en favoritos.`);
        }
    } catch (error) {
        console.error('❌ Error al marcar favorito:', error);
    }
  }

  async function desmarcarFavorito(req, id) {
    const userId = req.session.userId;
    if (!userId) {
        console.log('Usuario no autenticado');
        return;
    }
    id = Number(id);
    
    try {
        const [result] = await db.execute('SELECT favoritos FROM usuarios WHERE id = ?', [userId]);
        if (result.length === 0) {
            console.log('Usuario no encontrado');
            return;
        }
        let favoritos = result[0].favoritos || [];
        favoritos = favoritos.filter(favId => favId !== id);
        await db.execute('UPDATE usuarios SET favoritos = ? WHERE id = ?', [favoritos, userId]);
        console.log(`✅ Propiedad con ID ${id} eliminada de favoritos.`);
    } catch (error) {
        console.error('❌ Error al desmarcar favorito:', error);
    }
  }
  
  async function obtenerFavoritos(userId) {
    try {
        const [result] = await db.execute('SELECT favoritos FROM usuarios WHERE id = ?', [userId]);
        if (result.length === 0) {
            console.log('Usuario no encontrado');
            return [];
        }
        const favoritos = result[0].favoritos || []; // Aseguramos que favoritos sea un array vacío si no hay ninguno
        if (favoritos.length === 0) {
            return [];
        }
        const [propiedades] = await db.execute(`SELECT * FROM propiedades WHERE id IN (${favoritos.join(',')})`);
        return propiedades;
    } catch (error) {
        console.error('❌ Error al obtener favoritos:', error);
        return [];
    }
  }
  

// Agregar una nueva propiedad y devolver su ID
async function agregarPropiedad(nuevaPropiedad) {
  try {
      const query = 'INSERT INTO propiedades (titulo, descripcion, precio, tipo, modelo) VALUES (?, ?, ?, ?, ?)';
      const values = [nuevaPropiedad.titulo, nuevaPropiedad.descripcion, nuevaPropiedad.precio, nuevaPropiedad.tipo, nuevaPropiedad.modelo];
      const [result] = await db.execute(query, values);
      console.log('✅ Propiedad agregada con éxito:', nuevaPropiedad);
      return result.insertId;
  } catch (error) {
      console.error('❌ Error al agregar la propiedad:', error);
      return null;
  }
}

async function eliminarPropiedad(id) {
  try {
      const [result] = await db.execute('DELETE FROM propiedades WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
          console.log(`⚠️ No se encontró la propiedad con ID ${id}`);
          return false;
      }
      console.log(`✅ Propiedad con ID ${id} eliminada correctamente`);
      return true;
  } catch (error) {
      console.error('❌ Error al eliminar la propiedad:', error);
      return false;
  }
}

async function modificarPropiedad(id, nuevaData) {
  try {
      const query = 'UPDATE propiedades SET titulo = ?, descripcion = ?, precio = ?, tipo = ?, modelo = ? WHERE id = ?';
      const values = [nuevaData.titulo, nuevaData.descripcion, nuevaData.precio, nuevaData.tipo, nuevaData.modelo, id];
      const [result] = await db.execute(query, values);
      if (result.affectedRows === 0) {
          console.log(`⚠️ No se encontró la propiedad con ID ${id}`);
          return false;
      }
      console.log(`✅ Propiedad con ID ${id} modificada con éxito.`);
      return true;
  } catch (error) {
      console.error('❌ Error al modificar la propiedad:', error);
      return false;
  }
}

module.exports = {
  propiedades_type,
  propiedades_model,
  agregarPropiedad,
  marcarFavorito,
  desmarcarFavorito,
  obtenerFavoritos,
  eliminarPropiedad,
  modificarPropiedad
};