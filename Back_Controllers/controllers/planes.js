const connection = require('../configDB/dataBase');


const MostrarPlanes = (req, res) => {
    connection.query('SELECT * FROM planes', (err, results) => {
        if (err) {
            console.error('Error al obtener planes:', err);
            return res.status(500).json({error: 'Error al obtener planes'});
        }
        res.json(results);
    });
};

const MostrarPlane = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM planes WHERE id_plan = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener plane:', err);
            return res.status(500).json({error: 'Error al obtener plane', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Plane no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearPlane = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO planes (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear plane:', err);
            return res.status(500).json({error: 'Error al crear plane'});
        }
        res.status(201).json({message: 'Plane creada exitosamente', id: results.insertId});
    });
};

const ActualizarPlane = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE planes SET ' + setStr + ' WHERE id_plan = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar plane:', err);
            return res.status(500).json({ error: 'Error al actualizar plane' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Plane no encontrado' });
        }
        return res.json({ message: 'Plane actualizado exitosamente' });
    });
};

const EliminarPlane = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM planes WHERE id_plan = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar plane:', err);
            return res.status(500).json({error: 'Error al eliminar plane'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Plane no encontrado'});
        }
        res.json({message: 'Plane eliminado exitosamente'});
    });
};

module.exports = {
    MostrarPlanes,
    MostrarPlane,
    CrearPlane,
    ActualizarPlane,
    EliminarPlane
};
