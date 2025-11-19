const connection = require('../configDB/dataBase');


const MostrarPersonas = (req, res) => {
    connection.query('SELECT * FROM personas', (err, results) => {
        if (err) {
            console.error('Error al obtener personas:', err);
            return res.status(500).json({error: 'Error al obtener personas'});
        }
        res.json(results);
    });
};

const MostrarPersona = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM personas WHERE id_personas = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener persona:', err);
            return res.status(500).json({error: 'Error al obtener persona', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Persona no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearPersona = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO personas (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear persona:', err);
            return res.status(500).json({error: 'Error al crear persona'});
        }
        res.status(201).json({message: 'Persona creada exitosamente', id: results.insertId});
    });
};

const ActualizarPersona = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE personas SET ' + setStr + ' WHERE id_personas = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar persona:', err);
            return res.status(500).json({ error: 'Error al actualizar persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Persona no encontrado' });
        }
        return res.json({ message: 'Persona actualizado exitosamente' });
    });
};

const EliminarPersona = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM personas WHERE id_personas = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar persona:', err);
            return res.status(500).json({error: 'Error al eliminar persona'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Persona no encontrado'});
        }
        res.json({message: 'Persona eliminado exitosamente'});
    });
};

module.exports = {
    MostrarPersonas,
    MostrarPersona,
    CrearPersona,
    ActualizarPersona,
    EliminarPersona
};
