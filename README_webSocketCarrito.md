# WebSocket Carrito Inteligente 🚗📡

Este proyecto implementa una conexión WebSocket entre un carrito controlado por ESP32 y una app móvil desarrollada en Android Studio. La comunicación en tiempo real permite controlar el carrito de manera remota, enviando comandos como dirección, velocidad y modo de operación.

---

## 📦 Tecnologías utilizadas

- **WebSocket** (comunicación en tiempo real)
- **ESP32** (microcontrolador)
- **Android Studio** (aplicación móvil)
- **Node.js** (backend)
- **Express.js** (servidor backend)
- **CORS**
- **Dotenv**

---

## ⚙️ Funcionalidades principales

- 🕹️ Control remoto del carrito mediante una aplicación móvil.
- 📡 Comunicación en tiempo real con WebSocket.
- 🔄 Cambiar entre modo manual y automático.
- 🚀 Ajustar velocidad y dirección del carrito.
- 📏 Obtener datos de sensores en tiempo real (por ejemplo, sensor ultrasónico).

---

## 🔌 Flujo de la comunicación

1. **App Android** se conecta al servidor WebSocket.
2. El servidor WebSocket se comunica con el **ESP32**.
3. Los comandos enviados desde la app Android controlan el carrito en tiempo real (dirección, velocidad, modo, etc.).

---

## 🔧 Endpoints disponibles

### Conexión WebSocket
- **Servidor**: El servidor escucha en un puerto definido para la conexión WebSocket.
- **Mensajes**:
  - `direccion`: "adelante", "atras", "izquierda", "derecha"
  - `velocidad`: Número (valor numérico para la velocidad del carrito)
  - `modo`: "manual", "automatico"

---

## 🛠 Instalación y uso

### Backend (Servidor WebSocket)
```bash
# Clonar el repositorio
git clone https://github.com/luisdev265/webSocketCarrito

# Instalar dependencias
npm install

# Crear archivo .env y agregar las variables necesarias:
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_de_datos

# Iniciar el servidor WebSocket
npm start
```

### App Android
- La app móvil debe estar configurada para conectarse al servidor WebSocket en la dirección y puerto correspondientes.
- Asegúrate de que la app tenga permisos de red adecuados y pueda conectarse al servidor WebSocket en tiempo real.

---

## 🧠 Notas

Este proyecto utiliza **WebSocket** para la comunicación en tiempo real, lo que permite controlar el carrito de manera remota desde la aplicación móvil. Ideal para proyectos de robótica y automatización educativa.

---


## 👨‍💻 Autor

- Luis Dev (@luisdev265)
