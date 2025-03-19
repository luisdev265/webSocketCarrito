const { pool } = require("../config/database");

async function saveAction(action) {
  let connection;
  try {
    connection = await pool.getConnection();

    await connection.query("SET time_zone = 'America/Mexico_City'");

    const query = "INSERT INTO movimientos (movimiento) VALUES (?)";
    const [result] = await connection.query(query, [action.type]);

    if (result.affectedRows === 1) {
        console.log("Acción guardada en la base de datos, ID:", result.insertId);
        return result.insertId;
    } else {
      console.log("No se pudo guardar la acción en la base de datos");
      throw new Error('No se pudo guardar la acción en la base de datos');
    }
  } catch (error) {
    console.error("Error al guardar la acción:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function getActions(limit = 100) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM acciones ORDER BY timestamp DESC LIMIT ?",
      [limit]
    );
    return rows;
  } catch (error) {
    console.error("Error al obtener acciones:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  saveAction,
  getActions,
};
