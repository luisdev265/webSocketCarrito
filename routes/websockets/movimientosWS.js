const actionModel = require('../../models/action');
const WebSocket = require('ws');

// Store all active connections
const clients = new Set();

const setupMovimientosWS = (ws) => {
    console.log('Nueva conexión WebSocket establecida');
    
    // Add client to the set
    clients.add(ws);

    // Enviar mensaje de bienvenida
    ws.send(JSON.stringify({ type: 'connection', message: 'Conexión establecida con el servidor' }));

    // Manejar mensajes recibidos
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        console.log('Mensaje recibido:', data);

        // Guardar la acción en la base de datos
        if (data.action) {
          const actionId = await actionModel.saveAction(data.action);
          
          // Broadcast to all connected clients
          const broadcastMessage = {
            type: 'new_movement',
            movement: data.action.type,
            actionId: actionId
          };

          clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(broadcastMessage));
            }
          });

          // Confirmar al cliente que envió la acción
          ws.send(JSON.stringify({
            type: 'confirmation',
            actionId: actionId,
            message: 'Acción registrada correctamente'
          }));
        }
      } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Error al procesar la acción'
        }));
      }
    });

    // Manejar desconexiones
    ws.on('close', () => {
      clients.delete(ws);
      console.log('Conexión WebSocket cerrada en /movimientos');
    });
}

module.exports = setupMovimientosWS;