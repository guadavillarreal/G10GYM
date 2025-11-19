const connection = require('../configDB/dataBase');


const MostrarProgresos = (req, res) => {
    connection.query('SELECT * FROM progresos', (err, results) => {
        if (err) {
            console.error('Error al obtener progresos:', err);
            return res.status(500).json({error: 'Error al obtener progresos'});
        }
        res.json(results);
    });
};

const MostrarProgreso = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM progresos WHERE id_progreso = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener progreso:', err);
            return res.status(500).json({error: 'Error al obtener progreso', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Progreso no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearProgreso = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO progresos (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear progreso:', err);
            return res.status(500).json({error: 'Error al crear progreso'});
        }
        res.status(201).json({message: 'Progreso creada exitosamente', id: results.insertId});
    });
};

const ActualizarProgreso = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE progresos SET ' + setStr + ' WHERE id_progreso = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar progreso:', err);
            return res.status(500).json({ error: 'Error al actualizar progreso' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Progreso no encontrado' });
        }
        return res.json({ message: 'Progreso actualizado exitosamente' });
    });
};

const EliminarProgreso = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM progresos WHERE id_progreso = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar progreso:', err);
            return res.status(500).json({error: 'Error al eliminar progreso'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Progreso no encontrado'});
        }
        res.json({message: 'Progreso eliminado exitosamente'});
    });
};

module.exports = {
    MostrarProgresos,
    MostrarProgreso,
    CrearProgreso,
    ActualizarProgreso,
    EliminarProgreso
};
