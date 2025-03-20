const WebSocket = require("ws");

//guardar todos los clientes
const clients = new Set();

const modomanualWS = (ws) => {
  console.log("Nueva conexión WebSocket establecida");

  // Add client to the set
  clients.add(ws);

  // Enviar mensaje de bienvenida
  ws.send(
    JSON.stringify({
      type: "connection",
      message: "Conexión establecida con el servidor",
    })
  );

  // Manejar mensajes recibidos
  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);
      console.log("Mensaje recibido:", data);

      if (data.setMovement) {
        const broadcastMessage = {
          type: "setMovement",
          movement: data.setMovement,
        };

        // Enviar el mensaje a todos los clientes conectados
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(broadcastMessage));
          }
        });
      }

      if (data.unsetMovement) {
        const broadcastMessage = {
          type: "unset_movement",
          movement: data.unsetMovement,
        };

        // Enviar el mensaje a todos los clientes conectados
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(broadcastMessage));
          }
        });
      }
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Error al procesar el mensaje",
        })
      );
    }
  });

  // Manejar desconexiones
  ws.on("close", () => {
    clients.delete(ws);
    console.log("Conexión WebSocket cerrada en /movimientos");
  });
};

module.exports = modomanualWS;