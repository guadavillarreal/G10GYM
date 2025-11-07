// Script para importar gimnasio.sql usando mysql2 (no necesita cliente `mysql` instalado)
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function main() {
  const sqlPath = path.resolve(__dirname, 'gimnasio.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ No se encontró el archivo gimnasio.sql en la raíz del proyecto.');
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connectionConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
    // No especificamos database para permitir que el SQL cree/seleccione la DB
  };

  console.log('ℹ️  Conectando a MySQL con:', {
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
  });

  let conn;
  try {
    conn = await mysql.createConnection(connectionConfig);
    console.log('🔌 Conexión establecida. Importando SQL...');

    // Ejecutar el SQL completo. multipleStatements permite múltiples sentencias.
    await conn.query(sql);

    console.log('✅ Importación completada.');
  } catch (err) {
    console.error('❌ Error al importar SQL:', err.message || err);
    process.exitCode = 1;
  } finally {
    if (conn) await conn.end();
  }
}

main();
