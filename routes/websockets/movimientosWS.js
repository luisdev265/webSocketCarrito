const actionModel = require("../../models/action");
const WebSocket = require("ws");

// Store all active connections
const clients = new Set();

const sendToClients = (message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

const setupMovimientosWS = (ws) => {
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

      // Guardar la acción en la base de datos
      if (data.action) {
        const actionId = await actionModel.saveAction(data.action);

        // Broadcast to all connected clients
        const broadcastMessage = {
          type: "new_movement",
          movement: data.action.type,
          actionId: actionId,
        };

        sendToClients(broadcastMessage);

        // Confirmar al cliente que envió la acción
        ws.send(
          JSON.stringify({
            type: "confirmation",
            actionId: actionId,
            message: "Acción registrada correctamente",
          })
        );
      } else if (data.manual) {
        try {
          const actionId = await actionModel.saveAction(data.manual);
          // Manejar los movimientos manuales
          console.log("Mensaje recibido de modo manual:", data);

          const broadcastMessage = {
            type: "setMovement",
            movement: data.manual.type,
            actionId: actionId,
            message: "Acción registrada correctamente",
          };

          sendToClients(broadcastMessage);
        } catch (error) {
          console.error("Error al procesar el mensaje manual:", error);
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Error al procesar el mensaje manual",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Error al procesar la acción",
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

module.exports = setupMovimientosWS;
