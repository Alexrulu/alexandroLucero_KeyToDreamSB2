const express = require('express');
const router = express.Router();
const db = require('../database/config/db');

// Eliminar propiedad
router.delete('/propiedades/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({ success: false, message: 'ID inválido' });
    }
    try {
        const [result] = await db.execute('DELETE FROM properties WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: `Propiedad con ID ${id} eliminada.` });
        } else {
            res.status(404).json({ success: false, message: `No se encontró la propiedad con ID ${id}.` });
        }
    } catch (error) {
        console.error('Error al eliminar propiedad:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Modificar propiedad
router.put('/propiedades/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const nuevaData = req.body;
    if (!id || !nuevaData) {
        return res.status(400).json({ success: false, message: 'ID inválido o datos incorrectos' });
    }
    try {
        const fields = Object.keys(nuevaData).map(field => `${field} = ?`).join(', ');
        const values = Object.values(nuevaData);
        values.push(id);
        const [result] = await db.execute(`UPDATE properties SET ${fields} WHERE id = ?`, values);
        if (result.affectedRows > 0) {
            res.json({ success: true, message: `Propiedad con ID ${id} modificada con éxito.` });
        } else {
            res.status(404).json({ success: false, message: `No se encontró la propiedad con ID ${id}.` });
        }
    } catch (error) {
        console.error('Error al modificar propiedad:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Actualizar perfil de usuario
router.post('/update-profile', async (req, res) => {
    const { id, name, phone, cellphone } = req.body;
    if (!id) {
        return res.status(400).json({ success: false, message: 'ID de usuario inválido' });
    }
    try {
        const [result] = await db.execute(
            'UPDATE users SET name = ?, phone = ?, cellphone = ? WHERE id = ?',
            [name, phone, cellphone, id]
        );
        if (result.affectedRows > 0) {
            req.session.user = { ...req.session.user, name, phone, cellphone };
            res.json({ success: true, message: 'Datos actualizados con éxito' });
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Eliminar usuario
router.post('/delete-user', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ success: false, message: 'ID de usuario inválido' });
    }
    try {
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
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
        } else {
            res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});
module.exports = router;
