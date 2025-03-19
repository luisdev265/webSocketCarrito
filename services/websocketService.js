const WebSocket = require('ws');
const actionModel = require('../models/action');

function setupWebSocketServer(server) {
  // Crear servidor WebSocket
  const wss = new WebSocket.Server({ server });

  // Manejar conexiones WebSocket
  wss.on('connection', (ws) => {
    console.log('Nueva conexión WebSocket establecida');

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
          
          // Confirmar al cliente que la acción fue guardada
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
      console.log('Conexión WebSocket cerrada');
    });
  });

  return wss;
}

module.exports = setupWebSocketServer;