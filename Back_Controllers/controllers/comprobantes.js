const connection = require('../configDB/dataBase');


const MostrarComprobantes = (req, res) => {
    connection.query('SELECT * FROM comprobantes', (err, results) => {
        if (err) {
            console.error('Error al obtener comprobantes:', err);
            return res.status(500).json({error: 'Error al obtener comprobantes'});
        }
        res.json(results);
    });
};

const MostrarComprobante = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM comprobantes WHERE id_comprobante = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener comprobante:', err);
            return res.status(500).json({error: 'Error al obtener comprobante', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Comprobante no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearComprobante = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO comprobantes (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear comprobante:', err);
            return res.status(500).json({error: 'Error al crear comprobante'});
        }
        res.status(201).json({message: 'Comprobante creada exitosamente', id: results.insertId});
    });
};

const ActualizarComprobante = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE comprobantes SET ' + setStr + ' WHERE id_comprobante = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar comprobante:', err);
            return res.status(500).json({ error: 'Error al actualizar comprobante' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Comprobante no encontrado' });
        }
        return res.json({ message: 'Comprobante actualizado exitosamente' });
    });
};

const EliminarComprobante = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM comprobantes WHERE id_comprobante = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar comprobante:', err);
            return res.status(500).json({error: 'Error al eliminar comprobante'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Comprobante no encontrado'});
        }
        res.json({message: 'Comprobante eliminado exitosamente'});
    });
};

module.exports = {
    MostrarComprobantes,
    MostrarComprobante,
    CrearComprobante,
    ActualizarComprobante,
    EliminarComprobante
};
