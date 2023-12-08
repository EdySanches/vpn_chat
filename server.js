const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message, isBinary) => {
    console.log(`Received: ${message}`);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

function objectToArrayBuffer(obj) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj);

  // Create a TextEncoder to encode the string into bytes
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(jsonString);

  // Create an ArrayBuffer from the encoded bytes
  const arrayBuffer = encodedData.buffer;

  return arrayBuffer;
}
