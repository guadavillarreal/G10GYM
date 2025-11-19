const connection = require('../configDB/dataBase');


const MostrarClases_equipos = (req, res) => {
    connection.query('SELECT * FROM clases_equipos', (err, results) => {
        if (err) {
            console.error('Error al obtener clases_equipos:', err);
            return res.status(500).json({error: 'Error al obtener clases_equipos'});
        }
        res.json(results);
    });
};

const MostrarClases_equipo = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM clases_equipos WHERE id_clase = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener clases_equipo:', err);
            return res.status(500).json({error: 'Error al obtener clases_equipo', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Clases_equipo no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearClases_equipo = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO clases_equipos (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear clases_equipo:', err);
            return res.status(500).json({error: 'Error al crear clases_equipo'});
        }
        res.status(201).json({message: 'Clases_equipo creada exitosamente', id: results.insertId});
    });
};

const ActualizarClases_equipo = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE clases_equipos SET ' + setStr + ' WHERE id_clase = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar clases_equipo:', err);
            return res.status(500).json({ error: 'Error al actualizar clases_equipo' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Clases_equipo no encontrado' });
        }
        return res.json({ message: 'Clases_equipo actualizado exitosamente' });
    });
};

const EliminarClases_equipo = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM clases_equipos WHERE id_clase = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar clases_equipo:', err);
            return res.status(500).json({error: 'Error al eliminar clases_equipo'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Clases_equipo no encontrado'});
        }
        res.json({message: 'Clases_equipo eliminado exitosamente'});
    });
};

module.exports = {
    MostrarClases_equipos,
    MostrarClases_equipo,
    CrearClases_equipo,
    ActualizarClases_equipo,
    EliminarClases_equipo
};
