# webSocketCarrito

A real-time WebSocket server for tracking and broadcasting movement data.

## Features

- Real-time movement tracking via WebSocket
- Persistent storage of movements in a MySQL database
- Multiple WebSocket endpoints for different functionalities
- Automatic broadcasting of new movements to all connected clients

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/luisdev265/webSocketCarrito.git
   cd webSocketCarrito
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your database configuration:

   ```plaintext
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   PORT=3000
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Connect to WebSocket:

   Connect to the WebSocket endpoint at:

   ```plaintext
   ws://localhost:3000/movimientos
   ```

3. Sending movement data:

   Send JSON data in the following format:

   ```json
   {
     "action": {
       "type": "adelante"
     }
   }
   ```

   Possible movement types:

   - `adelante`
   - `atras`
   - `izquierda`
   - `derecha`

## License

MIT License

&copy; 2025 Luis Mario Gutierrez Valdovinos

