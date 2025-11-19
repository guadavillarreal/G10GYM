const connection = require('../configDB/dataBase');


const MostrarEmpleados = (req, res) => {
    connection.query('SELECT * FROM empleados', (err, results) => {
        if (err) {
            console.error('Error al obtener empleados:', err);
            return res.status(500).json({error: 'Error al obtener empleados'});
        }
        res.json(results);
    });
};

const MostrarEmpleado = (req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM empleados WHERE id_empleado = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener empleado:', err);
            return res.status(500).json({error: 'Error al obtener empleado', detalle: err});
        }
        if (results.length === 0) {
            return res.status(404).json({error: 'Empleado no encontrado'});
        }
        res.json(results[0]);
    });
};

const CrearEmpleado = (req, res) => {
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    const placeholders = cols.map(_=> '?').join(', ');
    const sql = 'INSERT INTO empleados (' + cols.join(', ') + ') VALUES (' + placeholders + ')';
    connection.query(sql, vals, (err, results) => {
        if (err) {
            console.error('Error al crear empleado:', err);
            return res.status(500).json({error: 'Error al crear empleado'});
        }
        res.status(201).json({message: 'Empleado creada exitosamente', id: results.insertId});
    });
};

const ActualizarEmpleado = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const cols = Object.keys(data);
    const vals = Object.values(data);
    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });
    const setStr = cols.map(c => c + ' = ?').join(', ');
    const sql = 'UPDATE empleados SET ' + setStr + ' WHERE id_empleado = ?';
    connection.query(sql, [...vals, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar empleado:', err);
            return res.status(500).json({ error: 'Error al actualizar empleado' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        return res.json({ message: 'Empleado actualizado exitosamente' });
    });
};

const EliminarEmpleado = (req, res) => {
    const {id} = req.params;
    connection.query('DELETE FROM empleados WHERE id_empleado = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar empleado:', err);
            return res.status(500).json({error: 'Error al eliminar empleado'});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Empleado no encontrado'});
        }
        res.json({message: 'Empleado eliminado exitosamente'});
    });
};

module.exports = {
    MostrarEmpleados,
    MostrarEmpleado,
    CrearEmpleado,
    ActualizarEmpleado,
    EliminarEmpleado
};
