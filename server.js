const WebSocketServer = require('ws');

const wss1 = new WebSocketServer.Server({ port: 8082 });
const wss2 = new WebSocketServer.Server({ port: 8083 });

wss1.on("connection", ws1 => {
  console.log(`New guest connected to wss1`);

  ws1.on("message", data => {
    console.log(`Client has sent us (wss1):`, data.toString());

    // Atualizar dadoss1 e enviar a mensagem para wss2

    transmitirMensagem(data.toString(), wss2);
  });

  ws1.on("close", () => {
    console.log("the client has disconnected from wss1");
  });

  ws1.onerror = function () {
    console.log("Some Error occurred on wss1");
  }
});

wss2.on("connection", ws2 => {
  console.log(`New guest connected to wss2`);

  ws2.on("message", data => {
    console.log(`Client has sent us (wss2):`, data.toString());

    // Atualizar dadoss2 e enviar a mensagem para wss1
    transmitirMensagem(data.toString(), wss1);
  });

  ws2.on("close", () => {
    console.log("the client has disconnected from wss2");
  });

  ws2.onerror = function () {
    console.log("Some Error occurred on wss2");
  }
});

function transmitirMensagem(mensagem, destino) {
  console.log(JSON.stringify(mensagem))
  destino.clients.forEach(ws => {
    if (ws.readyState === WebSocketServer.OPEN) {
      ws.send((mensagem), (error) => {
        if (error) {
          console.error(`Error sending message: ${error.message}`);
        }
      });
    }
  });
}

console.log("The WebSocket server is running on port 8082");
console.log("The WebSocket server is running on port 8083");
