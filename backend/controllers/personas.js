const connection = require('../config DB/dataBase');

// Controlador para obtener todas las personas
const mostrarPersonas = (req, res) => {
    connection.query('SELECT * FROM personas', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener las personas' });
        }
        res.status(200).json(results);
    });
};

//controlador para obtener una persona
const mostrarPersona = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM personas WHERE id_persona = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener la persona' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(200).json(results[0]);
    });
}

// Controlador para agregar una nueva persona
const crearPersona = (req, res) => {
    const { nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion } = req.body;
    connection.query('INSERT INTO personas (nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error al crear la persona' });
            }
            res.status(201).json({
                message: 'Persona creada exitosamente',
                id: results.insertId
            });
        });
}

// Controlador para actualizar una persona existente
const editarPersona = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion } = req.body;
    connection.query('UPDATE personas SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, telefono = ?, email = ?, direccion = ? WHERE id_persona = ?',
        [nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion, id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al actualizar la persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.json({ id, nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion });
    })
}

// Controlador para eliminar una persona
const eliminarPersona = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM personas WHERE id_persona = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar la persona' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
        res.status(204).send();
    })
}

module.exports = {
    mostrarPersonas,
    mostrarPersona,
    crearPersona,
    editarPersona,
    eliminarPersona
}