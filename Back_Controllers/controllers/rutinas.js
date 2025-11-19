const connection = require('../configDB/dataBase');


const MostrarRutinas = (req, res) => {
    connection.query('SELECT * FROM rutinas', (err, results) => {
        if (err) {
            console.error('Error al obtener rutinas:', err);
            return res.status(500).json({error: 'Error al obtener rutinas'});
        }
        res.json(results);
    });
};

const MostrarRutina = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM rutinas WHERE id_rutina = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener rutina:', err);
            return res.status(500).json({error: 'Error al obtener rutina', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Rutina no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearRutina = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO rutinas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear rutina:', err);
            return res.status(500).json({error: 'Error al crear rutina'});
        }
        res.status(201).json({message: 'Rutina creada exitosamente', id: results.insertId});
    });
};

const ActualizarRutina = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE rutinas SET ' + setStr + ' WHERE id_rutina = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar rutina:', err);
            return res.status(500).json({ error: 'Error al actualizar rutina' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rutina no encontrado' });
        }
        return res.json({ message: 'Rutina actualizado exitosamente' });
    });
};

const EliminarRutina = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM rutinas WHERE id_rutina = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar rutina:', err);
            return res.status(500).json({error: 'Error al eliminar rutina'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Rutina no encontrado'});
        }
        res.json({message: 'Rutina eliminado exitosamente'});
    });
};

module.exports = {
    MostrarRutinas,
    MostrarRutina,
    CrearRutina,
    ActualizarRutina,
    EliminarRutina
};
