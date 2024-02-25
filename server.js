const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('server start')
wss.on('connection', ws => {
  console.log('A new client connected!');
  ws.on('message', message => {
    // Broadcast any message received to all clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});