const connection = require('../configDB/dataBase');


const MostrarRutinas_asignadas = (req, res) => {
    connection.query('SELECT * FROM rutinas_asignadas', (err, results) => {
        if (err) {
            console.error('Error al obtener rutinas_asignadas:', err);
            return res.status(500).json({error: 'Error al obtener rutinas_asignadas'});
        }
        res.json(results);
    });
};

const MostrarRutinas_asignada = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM rutinas_asignadas WHERE id_rutina = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener rutinas_asignada:', err);
            return res.status(500).json({error: 'Error al obtener rutinas_asignada', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Rutinas_asignada no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearRutinas_asignada = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO rutinas_asignadas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear rutinas_asignada:', err);
            return res.status(500).json({error: 'Error al crear rutinas_asignada'});
        }
        res.status(201).json({message: 'Rutinas_asignada creada exitosamente', id: results.insertId});
    });
};

const ActualizarRutinas_asignada = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE rutinas_asignadas SET ' + setStr + ' WHERE id_rutina = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar rutinas_asignada:', err);
            return res.status(500).json({ error: 'Error al actualizar rutinas_asignada' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Rutinas_asignada no encontrado' });
        }
        return res.json({ message: 'Rutinas_asignada actualizado exitosamente' });
    });
};

const EliminarRutinas_asignada = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM rutinas_asignadas WHERE id_rutina = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar rutinas_asignada:', err);
            return res.status(500).json({error: 'Error al eliminar rutinas_asignada'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Rutinas_asignada no encontrado'});
        }
        res.json({message: 'Rutinas_asignada eliminado exitosamente'});
    });
};

module.exports = {
    MostrarRutinas_asignadas,
    MostrarRutinas_asignada,
    CrearRutinas_asignada,
    ActualizarRutinas_asignada,
    EliminarRutinas_asignada
};
