const connection = require('../configDB/dataBase');


const MostrarContrataciones = (req, res) => {
    connection.query('SELECT * FROM contrataciones', (err, results) => {
        if (err) {
            console.error('Error al obtener contrataciones:', err);
            return res.status(500).json({error: 'Error al obtener contrataciones'});
        }
        res.json(results);
    });
};

const MostrarContratacione = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM contrataciones WHERE id_contratacion = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener contratacione:', err);
            return res.status(500).json({error: 'Error al obtener contratacione', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Contratacione no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearContratacione = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO contrataciones (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear contratacione:', err);
            return res.status(500).json({error: 'Error al crear contratacione'});
        }
        res.status(201).json({message: 'Contratacione creada exitosamente', id: results.insertId});
    });
};

const ActualizarContratacione = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE contrataciones SET ' + setStr + ' WHERE id_contratacion = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar contratacione:', err);
            return res.status(500).json({ error: 'Error al actualizar contratacione' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Contratacione no encontrado' });
        }
        return res.json({ message: 'Contratacione actualizado exitosamente' });
    });
};

const EliminarContratacione = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM contrataciones WHERE id_contratacion = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar contratacione:', err);
            return res.status(500).json({error: 'Error al eliminar contratacione'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Contratacione no encontrado'});
        }
        res.json({message: 'Contratacione eliminado exitosamente'});
    });
};

module.exports = {
    MostrarContrataciones,
    MostrarContratacione,
    CrearContratacione,
    ActualizarContratacione,
    EliminarContratacione
};
