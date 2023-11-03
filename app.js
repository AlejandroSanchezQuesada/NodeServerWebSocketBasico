import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8080 });

//Esto se ejecuta cuando un cliente se conecta
wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Envía el timestamp actual al cliente cuando se conecta
  ws.send(JSON.stringify({ timestamp: new Date() }));

  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    ws.send('Mensaje recibido');
  });
});

// Función para enviar el timestamp a todos los clientes cada segundo
function sendTimestampToClients() {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ timestamp: new Date() }));
      }
    });
  }
  
  // Configura un intervalo para enviar el timestamp a todos los clientes cada segundo
  setInterval(sendTimestampToClients, 1000);