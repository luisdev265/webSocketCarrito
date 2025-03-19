const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const initializeDbConnection = require('./config/database').initializeDbConnection;
const setupWebSocketServer = require('./services/websocketService');

// Configuración de Express
const app = express();
app.use(cors());
app.use(express.json());

// Crear servidor HTTP
const server = http.createServer(app);// Crear servidor HTTP

//Iniciar servidor
const PORT = process.env.PORT || 3000;

// Inicializar la base de datos y luego iniciar el servidor
initializeDbConnection().then(() => {
    setupWebSocketServer(server);
    server.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`Servidor WebSocket ejecutándose en ws://localhost:${PORT}`);
    });
  });
