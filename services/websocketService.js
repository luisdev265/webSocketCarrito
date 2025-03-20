const WebSocket = require('ws');
const setupMovimientosWS = require('../routes/websockets/movimientosWS');
const modoManualWS = require('../routes/websockets/modomanualWS');

function setupWebSocketServer(server) {
  // Crear servidor WebSocket
  const wssMovimientos = new WebSocket.Server({ server, path: '/movimientos' });
  const wssModoManual = new WebSocket.Server({ server, path: '/modomanual' });

  // Manejar conexiones WebSocket
  wssMovimientos.on('connection', setupMovimientosWS);
  wssModoManual.on('connection', modoManualWS);

  return wssMovimientos, wssModoManual;
}

module.exports = setupWebSocketServer;