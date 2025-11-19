const connection = require('../configDB/dataBase');


const MostrarDietas_asignadas = (req, res) => {
    connection.query('SELECT * FROM dietas_asignadas', (err, results) => {
        if (err) {
            console.error('Error al obtener dietas_asignadas:', err);
            return res.status(500).json({error: 'Error al obtener dietas_asignadas'});
        }
        res.json(results);
    });
};

const MostrarDietas_asignada = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM dietas_asignadas WHERE id_dieta = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener dietas_asignada:', err);
            return res.status(500).json({error: 'Error al obtener dietas_asignada', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Dietas_asignada no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearDietas_asignada = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO dietas_asignadas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear dietas_asignada:', err);
            return res.status(500).json({error: 'Error al crear dietas_asignada'});
        }
        res.status(201).json({message: 'Dietas_asignada creada exitosamente', id: results.insertId});
    });
};

const ActualizarDietas_asignada = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE dietas_asignadas SET ' + setStr + ' WHERE id_dieta = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar dietas_asignada:', err);
            return res.status(500).json({ error: 'Error al actualizar dietas_asignada' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Dietas_asignada no encontrado' });
        }
        return res.json({ message: 'Dietas_asignada actualizado exitosamente' });
    });
};

const EliminarDietas_asignada = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM dietas_asignadas WHERE id_dieta = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar dietas_asignada:', err);
            return res.status(500).json({error: 'Error al eliminar dietas_asignada'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Dietas_asignada no encontrado'});
        }
        res.json({message: 'Dietas_asignada eliminado exitosamente'});
    });
};

module.exports = {
    MostrarDietas_asignadas,
    MostrarDietas_asignada,
    CrearDietas_asignada,
    ActualizarDietas_asignada,
    EliminarDietas_asignada
};
