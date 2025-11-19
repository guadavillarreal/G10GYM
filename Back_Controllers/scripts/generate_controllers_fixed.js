const fs = require('fs');
const path = require('path');

// Script corregido: genera controladores y routers para cada tabla encontrada en la base de datos.
// Uso: node scripts/generate_controllers_fixed.js

const connection = require('../configDB/dataBase');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function singularize(name) {
  if (name.endsWith('s')) return name.slice(0, -1);
  return name;
}

async function main() {
  const dbName = (connection.config && connection.config.database) || 'gimnasio';

  try {
    const [tablesRows] = await connection.promise().query('SHOW TABLES');
    const tables = tablesRows.map(row => Object.values(row)[0]);

    for (const table of tables) {
      const capTable = capitalize(table);
      const singular = singularize(table);
      const capSingular = capitalize(singular);

      const [pkRows] = await connection.promise().query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI' LIMIT 1`,
        [dbName, table]
      );

      const pk = (pkRows && pkRows.length > 0 && pkRows[0].COLUMN_NAME) ? pkRows[0].COLUMN_NAME : (`id_${singular}`);

      const controllersDir = path.join(__dirname, '..', 'controllers');
      const routersDir = path.join(__dirname, '..', 'routers');
      if (!fs.existsSync(controllersDir)) fs.mkdirSync(controllersDir);
      if (!fs.existsSync(routersDir)) fs.mkdirSync(routersDir);

      const controllerPath = path.join(controllersDir, `${table}.js`);
      const routerPath = path.join(routersDir, `${table}.js`);

      if (!fs.existsSync(controllerPath)) {
        // Generamos el contenido del controlador. Evitamos usar backticks internos para no romper este template.
        const controllerContent = `const connection = require('../configDB/dataBase');\n\n\n` +
`const Mostrar${capTable} = (req, res) => {\n` +
`    connection.query('SELECT * FROM ${table}', (err, results) => {\n` +
`        if (err) {\n` +
`            console.error('Error al obtener ${table}:', err);\n` +
`            return res.status(500).json({error: 'Error al obtener ${table}'});\n` +
`        }\n` +
`        res.json(results);\n` +
`    });\n` +
`};\n\n` +
`const Mostrar${capSingular} = (req, res) => {\n` +
`    const {id} = req.params;\n` +
`    connection.query('SELECT * FROM ${table} WHERE ${pk} = ?', [id], (err, results) => {\n` +
`        if (err) {\n` +
`            console.error('Error al obtener ${singular}:', err);\n` +
`            return res.status(500).json({error: 'Error al obtener ${singular}', detalle: err});\n` +
`        }\n` +
`        if (results.length === 0) {\n` +
`            return res.status(404).json({error: '${capSingular} no encontrado'});\n` +
`        }\n` +
`        res.json(results[0]);\n` +
`    });\n` +
`};\n\n` +
`const Crear${capSingular} = (req, res) => {\n` +
`    const data = req.body;\n` +
`    const cols = Object.keys(data);\n` +
`    const vals = Object.values(data);\n` +
`    const placeholders = cols.map(_=> '?').join(', ');\n` +
`    const sql = 'INSERT INTO ${table} (' + cols.join(', ') + ') VALUES (' + placeholders + ')';\n` +
`    connection.query(sql, vals, (err, results) => {\n` +
`        if (err) {\n` +
`            console.error('Error al crear ${singular}:', err);\n` +
`            return res.status(500).json({error: 'Error al crear ${singular}'});\n` +
`        }\n` +
`        res.status(201).json({message: '${capSingular} creada exitosamente', id: results.insertId});\n` +
`    });\n` +
`};\n\n` +
`const Actualizar${capSingular} = (req, res) => {\n` +
`    const { id } = req.params;\n` +
`    const data = req.body;\n` +
`    const cols = Object.keys(data);\n` +
`    const vals = Object.values(data);\n` +
`    if (cols.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });\n` +
`    const setStr = cols.map(c => c + ' = ?').join(', ');\n` +
`    const sql = 'UPDATE ${table} SET ' + setStr + ' WHERE ${pk} = ?';\n` +
`    connection.query(sql, [...vals, id], (err, results) => {\n` +
`        if (err) {\n` +
`            console.error('Error al actualizar ${singular}:', err);\n` +
`            return res.status(500).json({ error: 'Error al actualizar ${singular}' });\n` +
`        }\n` +
`        if (results.affectedRows === 0) {\n` +
`            return res.status(404).json({ error: '${capSingular} no encontrado' });\n` +
`        }\n` +
`        return res.json({ message: '${capSingular} actualizado exitosamente' });\n` +
`    });\n` +
`};\n\n` +
`const Eliminar${capSingular} = (req, res) => {\n` +
`    const {id} = req.params;\n` +
`    connection.query('DELETE FROM ${table} WHERE ${pk} = ?', [id], (err, results) => {\n` +
`        if (err) {\n` +
`            console.error('Error al eliminar ${singular}:', err);\n` +
`            return res.status(500).json({error: 'Error al eliminar ${singular}'});\n` +
`        }\n` +
`        if (results.affectedRows === 0) {\n` +
`            return res.status(404).json({error: '${capSingular} no encontrado'});\n` +
`        }\n` +
`        res.json({message: '${capSingular} eliminado exitosamente'});\n` +
`    });\n` +
`};\n\n` +
`module.exports = {\n` +
`    Mostrar${capTable},\n` +
`    Mostrar${capSingular},\n` +
`    Crear${capSingular},\n` +
`    Actualizar${capSingular},\n` +
`    Eliminar${capSingular}\n` +
`};\n`;

        fs.writeFileSync(controllerPath, controllerContent, { encoding: 'utf8' });
        console.log('Creado controlador:', controllerPath);
      } else {
        console.log('Controlador ya existe, se omite:', controllerPath);
      }

      if (!fs.existsSync(routerPath)) {
        const routerContent = `const express = require('express');\nconst router = express.Router();\nconst {Mostrar${capTable}, Mostrar${capSingular}, Crear${capSingular}, Actualizar${capSingular}, Eliminar${capSingular}} = require('../controllers/${table}');\n\nrouter.get('/', Mostrar${capTable});\nrouter.get('/:id', Mostrar${capSingular});\nrouter.post('/', Crear${capSingular});\nrouter.put('/:id', Actualizar${capSingular});\nrouter.delete('/:id', Eliminar${capSingular});\n\nmodule.exports = router;\n`;

        fs.writeFileSync(routerPath, routerContent, { encoding: 'utf8' });
        console.log('Creado router:', routerPath);
      } else {
        console.log('Router ya existe, se omite:', routerPath);
      }
    }

    console.log('Generación completada. Revise la carpeta controllers/ y routers/.');
    process.exit(0);
  } catch (err) {
    console.error('Error durante la generación:', err);
    process.exit(1);
  }
}

main();
