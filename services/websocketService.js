const WebSocket = require('ws');
const setupMovimientosWS = require('../routes/websockets/movimientosWS');

function setupWebSocketServer(server) {
  // Crear servidor WebSocket
  const wssMovimientos = new WebSocket.Server({ server, path: '/movimientos' });

  // Manejar conexiones WebSocket
  wssMovimientos.on('connection', setupMovimientosWS);

  return wssMovimientos;
}

module.exports = setupWebSocketServer;