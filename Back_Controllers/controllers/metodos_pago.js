const connection = require('../configDB/dataBase');


const MostrarMetodosPago = (req, res) => {
    connection.query('SELECT * FROM metodos_pago', (err, results) => {
        if (err) {
            console.error('Error al obtener metodos_pago:', err);
            return res.status(500).json({error: 'Error al obtener metodos_pago'});
        }
        res.json(results);
    });
};

// Función para obtener un único método de pago por id
const MostrarMetodosPagoById = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM metodos_pago WHERE id_metodo_pago = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener metodos_pago:', err);
            return res.status(500).json({error: 'Error al obtener metodos_pago', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Metodo de pago no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearMetodosPago = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO metodos_pago (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear metodos_pago:', err);
            return res.status(500).json({error: 'Error al crear metodos_pago'});
        }
        res.status(201).json({message: 'Metodos_pago creada exitosamente', id: results.insertId});
    });
};

const ActualizarMetodosPago = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE metodos_pago SET ' + setStr + ' WHERE id_metodo_pago = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar metodos_pago:', err);
            return res.status(500).json({ error: 'Error al actualizar metodos_pago' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Metodos_pago no encontrado' });
        }
        return res.json({ message: 'Metodos_pago actualizado exitosamente' });
    });
};

const EliminarMetodosPago = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM metodos_pago WHERE id_metodo_pago = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar metodos_pago:', err);
            return res.status(500).json({error: 'Error al eliminar metodos_pago'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Metodos_pago no encontrado'});
        }
        res.json({message: 'Metodos_pago eliminado exitosamente'});
    });
};

module.exports = {
    MostrarMetodosPago,        // lista todos
    MostrarMetodosPagoById,    // muestra uno por id
    CrearMetodosPago,
    ActualizarMetodosPago,
    EliminarMetodosPago
};
