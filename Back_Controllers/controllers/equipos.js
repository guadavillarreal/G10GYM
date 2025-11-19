const connection = require('../configDB/dataBase');


const MostrarEquipos = (req, res) => {
    connection.query('SELECT * FROM equipos', (err, results) => {
        if (err) {
            console.error('Error al obtener equipos:', err);
            return res.status(500).json({error: 'Error al obtener equipos'});
        }
        res.json(results);
    });
};

const MostrarEquipo = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM equipos WHERE id_equipo = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener equipo:', err);
            return res.status(500).json({error: 'Error al obtener equipo', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Equipo no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearEquipo = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO equipos (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear equipo:', err);
            return res.status(500).json({error: 'Error al crear equipo'});
        }
        res.status(201).json({message: 'Equipo creada exitosamente', id: results.insertId});
    });
};

const ActualizarEquipo = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE equipos SET ' + setStr + ' WHERE id_equipo = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar equipo:', err);
            return res.status(500).json({ error: 'Error al actualizar equipo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }
        return res.json({ message: 'Equipo actualizado exitosamente' });
    });
};

const EliminarEquipo = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM equipos WHERE id_equipo = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar equipo:', err);
            return res.status(500).json({error: 'Error al eliminar equipo'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Equipo no encontrado'});
        }
        res.json({message: 'Equipo eliminado exitosamente'});
    });
};

module.exports = {
    MostrarEquipos,
    MostrarEquipo,
    CrearEquipo,
    ActualizarEquipo,
    EliminarEquipo
};
