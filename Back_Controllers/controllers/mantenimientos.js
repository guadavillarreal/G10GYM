const connection = require('../configDB/dataBase');


const MostrarMantenimientos = (req, res) => {
    connection.query('SELECT * FROM mantenimientos', (err, results) => {
        if (err) {
            console.error('Error al obtener mantenimientos:', err);
            return res.status(500).json({error: 'Error al obtener mantenimientos'});
        }
        res.json(results);
    });
};

const MostrarMantenimiento = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM mantenimientos WHERE id_mantenimiento = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener mantenimiento:', err);
            return res.status(500).json({error: 'Error al obtener mantenimiento', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Mantenimiento no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearMantenimiento = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO mantenimientos (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear mantenimiento:', err);
            return res.status(500).json({error: 'Error al crear mantenimiento'});
        }
        res.status(201).json({message: 'Mantenimiento creada exitosamente', id: results.insertId});
    });
};

const ActualizarMantenimiento = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE mantenimientos SET ' + setStr + ' WHERE id_mantenimiento = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar mantenimiento:', err);
            return res.status(500).json({ error: 'Error al actualizar mantenimiento' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }
        return res.json({ message: 'Mantenimiento actualizado exitosamente' });
    });
};

const EliminarMantenimiento = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM mantenimientos WHERE id_mantenimiento = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar mantenimiento:', err);
            return res.status(500).json({error: 'Error al eliminar mantenimiento'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Mantenimiento no encontrado'});
        }
        res.json({message: 'Mantenimiento eliminado exitosamente'});
    });
};

module.exports = {
    MostrarMantenimientos,
    MostrarMantenimiento,
    CrearMantenimiento,
    ActualizarMantenimiento,
    EliminarMantenimiento
};
