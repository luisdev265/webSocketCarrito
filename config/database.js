const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initializeDbConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida');
    // Probamos que la conexión funciona

    await connection.query("SET time_zone = 'America/Mexico_City'");
    connection.release(); // Liberamos la conexión de vuelta al pool
    return pool; // Devolvemos el pool, no la conexión individual
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  } finally {
    // Siempre liberamos la conexión cuando terminamos, incluso si hubo un error
    if (connection) connection.release();
  }
}

module.exports = {
  pool,
  initializeDbConnection
};