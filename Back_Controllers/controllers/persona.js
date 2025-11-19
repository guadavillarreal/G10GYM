const connection = require('../configDB/dataBase');


const MostrarPersonas = (req, res) => {
    connection.query('SELECT * FROM personas', (err, results) => {
        if (err) {
            console.error('Error al obtener las personas:', err);
            return res.status(500).json({error: 'Error al obtener las personas'});
        }
        res.json(results);
    });
};

const MostrarPersona = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM personas WHERE id_personas = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener la persona:', err);
            return res.status(500).json({error: 'Error al obtener la persona',
                detalle: err
            });
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Persona no encontrada'});
        }
        res.json(results[0]);
    });
};


const CrearPersona = (req, res) => {
    const {nombre, apellido, dni, email, telefono} = req.body;
    connection.query('INSERT INTO personas (nombre, apellido, dni, email, telefono) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, dni, email, telefono], (err, results) => {
        if (err) {
            console.error('Error al crear la persona:', err);
            return res.status(500).json({error: 'Error al crear la persona'});
        }
        res.status(201).json({message: 'Persona creada exitosamente', id: results.insertId});
    });
};

const ActualizarPersona = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, email, telefono } = req.body;

    connection.query(
        'UPDATE personas SET nombre = ?, apellido = ?, dni = ?, email = ?, telefono = ? WHERE id_personas = ?',
        [nombre, apellido, dni, email, telefono, id],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar la persona:', err);
                return res.status(500).json({ error: 'Error al actualizar la persona' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Persona no encontrada' });
            }

            return res.json({ message: 'Persona actualizada exitosamente' });
        }
    );
};

const EliminarPersona = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM personas WHERE id_personas = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar la persona:', err);
            return res.status(500).json({error: 'Error al eliminar la persona'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Persona no encontrada'});
        }
        res.json({message: 'Persona eliminada exitosamente'});
    });
};

module.exports = {
    MostrarPersonas,
    MostrarPersona,
    CrearPersona,
    ActualizarPersona,
    EliminarPersona
};  