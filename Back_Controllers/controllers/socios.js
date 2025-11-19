const connection = require('../configDB/dataBase');


const MostrarSocios = (req, res) => {
    connection.query('SELECT * FROM socios', (err, results) => {
        if (err) {
            console.error('Error al obtener socios:', err);
            return res.status(500).json({error: 'Error al obtener socios'});
        }
        res.json(results);
    });
};

const MostrarSocio = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM socios WHERE id_socio = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener socio:', err);
            return res.status(500).json({error: 'Error al obtener socio', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Socio no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearSocio = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO socios (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear socio:', err);
            return res.status(500).json({error: 'Error al crear socio'});
        }
        res.status(201).json({message: 'Socio creada exitosamente', id: results.insertId});
    });
};

const ActualizarSocio = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE socios SET ' + setStr + ' WHERE id_socio = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar socio:', err);
            return res.status(500).json({ error: 'Error al actualizar socio' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Socio no encontrado' });
        }
        return res.json({ message: 'Socio actualizado exitosamente' });
    });
};

const EliminarSocio = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM socios WHERE id_socio = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar socio:', err);
            return res.status(500).json({error: 'Error al eliminar socio'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Socio no encontrado'});
        }
        res.json({message: 'Socio eliminado exitosamente'});
    });
};

module.exports = {
    MostrarSocios,
    MostrarSocio,
    CrearSocio,
    ActualizarSocio,
    EliminarSocio
};
