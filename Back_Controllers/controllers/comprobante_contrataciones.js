const connection = require('../configDB/dataBase');


const MostrarComprobante_contrataciones = (req, res) => {
    connection.query('SELECT * FROM comprobante_contrataciones', (err, results) => {
        if (err) {
            console.error('Error al obtener comprobante_contrataciones:', err);
            return res.status(500).json({error: 'Error al obtener comprobante_contrataciones'});
        }
        res.json(results);
    });
};

const MostrarComprobante_contratacione = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM comprobante_contrataciones WHERE id_comprobante = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener comprobante_contratacione:', err);
            return res.status(500).json({error: 'Error al obtener comprobante_contratacione', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Comprobante_contratacione no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearComprobante_contratacione = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO comprobante_contrataciones (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear comprobante_contratacione:', err);
            return res.status(500).json({error: 'Error al crear comprobante_contratacione'});
        }
        res.status(201).json({message: 'Comprobante_contratacione creada exitosamente', id: results.insertId});
    });
};

const ActualizarComprobante_contratacione = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE comprobante_contrataciones SET ' + setStr + ' WHERE id_comprobante = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar comprobante_contratacione:', err);
            return res.status(500).json({ error: 'Error al actualizar comprobante_contratacione' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Comprobante_contratacione no encontrado' });
        }
        return res.json({ message: 'Comprobante_contratacione actualizado exitosamente' });
    });
};

const EliminarComprobante_contratacione = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM comprobante_contrataciones WHERE id_comprobante = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar comprobante_contratacione:', err);
            return res.status(500).json({error: 'Error al eliminar comprobante_contratacione'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Comprobante_contratacione no encontrado'});
        }
        res.json({message: 'Comprobante_contratacione eliminado exitosamente'});
    });
};

module.exports = {
    MostrarComprobante_contrataciones,
    MostrarComprobante_contratacione,
    CrearComprobante_contratacione,
    ActualizarComprobante_contratacione,
    EliminarComprobante_contratacione
};
