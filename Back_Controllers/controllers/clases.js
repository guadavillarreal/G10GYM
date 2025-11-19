const connection = require('../configDB/dataBase');


const MostrarClases = (req, res) => {
    connection.query('SELECT * FROM clases', (err, results) => {
        if (err) {
            console.error('Error al obtener clases:', err);
            return res.status(500).json({error: 'Error al obtener clases'});
        }
        res.json(results);
    });
};

const MostrarClase = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM clases WHERE id_clase = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener clase:', err);
            return res.status(500).json({error: 'Error al obtener clase', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Clase no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearClase = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO clases (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear clase:', err);
            return res.status(500).json({error: 'Error al crear clase'});
        }
        res.status(201).json({message: 'Clase creada exitosamente', id: results.insertId});
    });
};

const ActualizarClase = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE clases SET ' + setStr + ' WHERE id_clase = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar clase:', err);
            return res.status(500).json({ error: 'Error al actualizar clase' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Clase no encontrado' });
        }
        return res.json({ message: 'Clase actualizado exitosamente' });
    });
};

const EliminarClase = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM clases WHERE id_clase = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar clase:', err);
            return res.status(500).json({error: 'Error al eliminar clase'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Clase no encontrado'});
        }
        res.json({message: 'Clase eliminado exitosamente'});
    });
};

module.exports = {
    MostrarClases,
    MostrarClase,
    CrearClase,
    ActualizarClase,
    EliminarClase
};
