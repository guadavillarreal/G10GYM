const connection = require('../configDB/dataBase');


const MostrarReservas = (req, res) => {
    connection.query('SELECT * FROM reservas', (err, results) => {
        if (err) {
            console.error('Error al obtener reservas:', err);
            return res.status(500).json({error: 'Error al obtener reservas'});
        }
        res.json(results);
    });
};

const MostrarReserva = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener reserva:', err);
            return res.status(500).json({error: 'Error al obtener reserva', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Reserva no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearReserva = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO reservas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear reserva:', err);
            return res.status(500).json({error: 'Error al crear reserva'});
        }
        res.status(201).json({message: 'Reserva creada exitosamente', id: results.insertId});
    });
};

const ActualizarReserva = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE reservas SET ' + setStr + ' WHERE id_reserva = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar reserva:', err);
            return res.status(500).json({ error: 'Error al actualizar reserva' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrado' });
        }
        return res.json({ message: 'Reserva actualizado exitosamente' });
    });
};

const EliminarReserva = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM reservas WHERE id_reserva = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar reserva:', err);
            return res.status(500).json({error: 'Error al eliminar reserva'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Reserva no encontrado'});
        }
        res.json({message: 'Reserva eliminado exitosamente'});
    });
};

module.exports = {
    MostrarReservas,
    MostrarReserva,
    CrearReserva,
    ActualizarReserva,
    EliminarReserva
};
