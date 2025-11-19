const connection = require('../configDB/dataBase');


const MostrarUsuarios = (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({error: 'Error al obtener usuarios'});
        }
        res.json(results);
    });
};

const MostrarUsuario = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM usuarios WHERE id_usuarios = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).json({error: 'Error al obtener usuario', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearUsuario = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO usuarios (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            return res.status(500).json({error: 'Error al crear usuario'});
        }
        res.status(201).json({message: 'Usuario creada exitosamente', id: results.insertId});
    });
};

const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE usuarios SET ' + setStr + ' WHERE id_usuarios = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.json({ message: 'Usuario actualizado exitosamente' });
    });
};

const EliminarUsuario = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM usuarios WHERE id_usuarios = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({error: 'Error al eliminar usuario'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.json({message: 'Usuario eliminado exitosamente'});
    });
};

module.exports = {
    MostrarUsuarios,
    MostrarUsuario,
    CrearUsuario,
    ActualizarUsuario,
    EliminarUsuario
};
