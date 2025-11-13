const connection = require("../config DB/dataBase");

// Controlador para obtener todos los usuarios
const mostrarUsuarios = (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if(error){
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.status(200).json(results);
    });
}

// Controlador para obtener un usuario por ID
const mostrarUsuario = (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener el usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(results[0]);
    });
}

// Controlador para crear un nuevo usuario
const crearUsuario = (req, res) => {
    // Log para debuggear
    console.log('Datos recibidos:', req.body);

    const { usuario, contraseña } = req.body;
    
    // Validación de campos requeridos
    if (!usuario || !contraseña) {
        return res.status(400).json({ 
            error: 'El usuario y contraseña son requeridos' 
        });
    }
    
    connection.query('INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)', [usuario, contraseña], (error, results) => {
        if (error) {
            console.error('Error en la inserción:', error);
            return res.status(500).json({ 
                error: 'Error al crear el usuario',
                details: error.message 
            });
        }
        
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            id: results.insertId,
            usuario: usuario
        });
    });
}

// Controlador para actualizar un usuario existente
const editarUsuario = (req, res) => {
    const { id } = req.params;
    const { usuario, contraseña } = req.body;

    console.log('PUT /usuario/:id body:', req.body);

    if (!usuario || !contraseña) {
        return res.status(400).json({ error: 'El usuario y la contraseña son requeridos' });
    }

    connection.query(
        'UPDATE usuarios SET usuario = ?, contraseña = ? WHERE id_usuario = ?',
        [usuario, contraseña, id],
        (error, results) => {
            if (error) {
                console.error('Error al actualizar usuario:', error);
                return res.status(500).json({ error: 'Error al editar el usuario' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ id: Number(id), usuario, contraseña });
        }
    );
}

// Controlador para eliminar un usuario
const eliminarUsuario = (req, res) => {
    const {id} = req.params;

    connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
}


//controlador para el login

const login = (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({
            error: 'Usuario y contraseña son requeridos'
        });
    }

    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?';
    
    connection.query(query, [usuario, contraseña], (error, results) => {
        if (error) {
            console.error('Error en login:', error);
            return res.status(500).json({
                error: 'Error al intentar iniciar sesión'
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                error: 'Credenciales inválidas'
            });
        }

        const usuarioEncontrado = results[0];
        return res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                id: usuarioEncontrado.id_usuario,
                usuario: usuarioEncontrado.usuario
            }
        });
    });
};


module.exports = {
    mostrarUsuarios,
    mostrarUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    login
};