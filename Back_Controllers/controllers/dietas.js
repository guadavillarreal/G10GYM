const connection = require('../configDB/dataBase');


const MostrarDietas = (req, res) => {
    connection.query('SELECT * FROM dietas', (err, results) => {
        if (err) {
            console.error('Error al obtener dietas:', err);
            return res.status(500).json({error: 'Error al obtener dietas'});
        }
        res.json(results);
    });
};

const MostrarDieta = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM dietas WHERE id_dieta = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener dieta:', err);
            return res.status(500).json({error: 'Error al obtener dieta', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Dieta no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearDieta = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO dietas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear dieta:', err);
            return res.status(500).json({error: 'Error al crear dieta'});
        }
        res.status(201).json({message: 'Dieta creada exitosamente', id: results.insertId});
    });
};

const ActualizarDieta = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE dietas SET ' + setStr + ' WHERE id_dieta = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar dieta:', err);
            return res.status(500).json({ error: 'Error al actualizar dieta' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Dieta no encontrado' });
        }
        return res.json({ message: 'Dieta actualizado exitosamente' });
    });
};

const EliminarDieta = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM dietas WHERE id_dieta = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar dieta:', err);
            return res.status(500).json({error: 'Error al eliminar dieta'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Dieta no encontrado'});
        }
        res.json({message: 'Dieta eliminado exitosamente'});
    });
};

module.exports = {
    MostrarDietas,
    MostrarDieta,
    CrearDieta,
    ActualizarDieta,
    EliminarDieta
};
